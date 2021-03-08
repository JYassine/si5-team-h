const low = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");
const adapter = new fileSync("db.json");
const db = low(adapter);
require("dotenv").config();
const uniqid = require("uniqid");
const bookingApi = require("../api/bookingApi");
const pathLinkPayment = `${process.env.PAYMENT_ADDR}` + "/payment/execute/";
const exceptionOrder = require("../exception/OrderPaymentNotFoundException");

const dotenv = require("dotenv");
const kafkaProducer = require("../kafka/kafkaProducer");

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  throw dotenvConfig.error;
}

const { Kafka } = require("kafkajs");
const broker_addr = "" + process.env.BROKERS_ADDR + "";
const kafka = new Kafka({
  clientId: "TravelAPI" + process.env.PRESTATAIRE_ID,
  brokers: [broker_addr],
});
db.defaults({ orderPayments: [] }).write();

db.defaults({ paymentDone: [] }).write();

async function addOrderPayment(body) {
  let order = constructOrderPayment(body);
  await db.get("orderPayments").push(order).write();

  return order;
}

const annulationPayment = async (id) => {
  if (await idAlreadyExist(id)) {
    await db.get("orderPayments").remove({ idBooking: id }).write();
    console.log(
      "[consumer/rollbackBooking/Payment] Order payment annulation for booking " +
        id
    );
  }
};

const constructOrderPayment = (body) => {
  let idOrderPayment = uniqid();
  let order = {
    id: idOrderPayment,
    idBooking: body.idBooking,
    currency: body.currency,
    total: body.total,
    payment_method: body.payment_method,
    linkPayment: pathLinkPayment + body.payment_method + "-" + idOrderPayment,
  };

  return order;
};

const idAlreadyExist = async (idBooking) => {
  const idAlreadyExist = await db
    .get("orderPayments")
    .find({ id: idBooking })
    .value();

  return idAlreadyExist !== undefined;
};

const validateOrderPayment = async (linkPaymentId) => {
  const idPayment = linkPaymentId.split("-")[1];
  const orderPayment = await db
    .get("orderPayments")
    .find({ id: idPayment })
    .value();
  if (orderPayment == undefined) {
    throw new exceptionOrder.OrderPaymentNotFoundException(
      "The order payment don't exist"
    );
  }

  if (process.env.FAIL_PAYMENT == 0) {
    var date = new Date(new Date().getTime());
    let statusOrder = {
      id: idPayment,
      status: "FAIL",
      transaction_time: date.toString(),
      amount: {
        total: orderPayment.total,
        currency: orderPayment.currency,
        payment_method: orderPayment.payment_method,
      },
    };

    const payment = await db
      .get("orderPayments")
      .find({ id: idPayment })
      .write();
    kafkaProducer.produceEvent(
      { payment: idPayment, booking: payment.idBooking, status: 0 },
      "status-payment",
      kafka
    );
    console.log("[producer/payment] Payment " + idPayment + " fail ");
    await db.get("orderPayments").remove({ id: idPayment }).write();

    return statusOrder;
  }

  var date = new Date(new Date().getTime());
  let statusOrder = {
    id: idPayment,
    status: "SUCCESSFULL",
    transaction_time: date.toString(),
    amount: {
      total: orderPayment.total,
      currency: orderPayment.currency,
      payment_method: orderPayment.payment_method,
    },
  };

  const payment = await db.get("orderPayments").find({ id: idPayment }).write();
  kafkaProducer.produceEvent(
    { payment: idPayment, booking: payment.idBooking, status: 1 },
    "status-payment",
    kafka
  );
  await db.get("paymentDone").push(statusOrder).write();
  await db.get("orderPayments").remove({ id: idPayment }).write();

  await bookingApi.payementRelease(orderPayment.idBooking);

  return statusOrder;
};

module.exports = {
  addOrderPayment,
  validateOrderPayment,
  annulationPayment,
};
