const low = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");
const adapter = new fileSync("db.json");
const kafkaProducer = require("../kafka/kafkaProducer");
const uniqid = require("uniqid");
const transaction = require("../status");
const db = low(adapter);
const axios = require("axios").default;
const travelAPI = require("../api/travelApi");
const { Kafka } = require("kafkajs");

const dotenv = require("dotenv");

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  throw dotenvConfig.error;
}
db.defaults({ bookings: [] }).write();

const broker_addr = "" + process.env.BROKERS_ADDR + "";
const kafka = new Kafka({
  clientId: "TravelAPI",
  brokers: [broker_addr],
});

const addBooking = async (body) => {
  var id = uniqid();

  if (await idAlreadyExist(id)) {
    throw Error("this id already exist in database");
  }

  //Calculer le prix
  const price = await travelAPI.getPrice(body);
  if (price === undefined) {
    kafkaProducer.produceEvent(
      {
        booking: id,
        status: transaction.status.FAIL,
      },
      "status-booking",
      kafka
    );
    return undefined;
  }

  await db
    .get("bookings")
    .push({ id: id, idTravels: body.idTravels, options: body.options })
    .write();

  //Obtenir un lien de payment pour ce prix
  var payment = await travelAPI.getLinkPayement({
    payment_method: "Paypal",
    idBooking: id,
    currency: "USD",
    total: price,
  });
  if (process.env.FAIL_BOOKING == 0) {
    kafkaProducer.produceEvent(
      {
        booking: id,
        status: transaction.status.FAIL,
      },
      "status-booking",
      kafka
    );

    console.log("[consumer/SNCF/booking] " + " Booking fail : " + id);
    return undefined;
  }
  let transactionBooking;
  if (payment !== undefined) {
    transactionBooking = {
      booking: payment.linkPayment,
      status: transaction.status.SUCCESS,
    };
  } else {
    transactionBooking = {
      link: payment.linkPayment,
      status: transaction.status.FAIL,
    };
    return undefined;
  }

  kafkaProducer.produceEvent(transactionBooking, "status-booking", kafka);

  return payment.linkPayment;
};

const annulationBooking = async (idBooking) => {
  if (await idAlreadyExist(idBooking)) {
    console.log(
      "[consumer/rollbackBooking/booking] Annulation of booking " + idBooking
    );
    await db.get("bookings").remove({ id: idBooking }).write();
  }
};

const idAlreadyExist = async (idBooking) => {
  const idAlreadyExist = await db
    .get("bookings")
    .find({ id: idBooking })
    .value();

  return idAlreadyExist !== undefined;
};

module.exports = {
  addBooking,
  annulationBooking,
};
