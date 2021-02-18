const express = require("express");
const bookingRooter = express.Router();
const bookingController = require("../controllers/addBooking");
const kafkaProducer = require("../kafka/kafkaProducer");
const dotenv = require("dotenv");

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  throw dotenvConfig.error;
}
var uniqid = require("uniqid");
const transaction = require("../status");
let responses = Object.create(null);
let requestBody = Object.create(null);

const { Kafka } = require("kafkajs");
const broker_addr = "" + process.env.BROKERS_ADDR + "";
const kafka = new Kafka({
  clientId: "TravelAPI",
  brokers: [broker_addr],
});

const consumer = kafka.consumer({ groupId: "reply-channel" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "reply-channel", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let serviceMessage = JSON.parse(message.value.toString());
      if (
        serviceMessage.service === "price" &&
        serviceMessage.status === transaction.status.SUCCESS
      ) {
        console.log(
          "[reply-channel/booking] Calculate the price : " +
            serviceMessage.price +
            " : SUCCESSFULL"
        );
        console.log(JSON.stringify(serviceMessage));
        kafkaProducer.produceEvent(
          {
            payment_method: "Paypal",
            idBooking: uniqid(),
            currency: "USD",
            total: serviceMessage.price,
          },
          "payment",
          kafka
        );
      }
      if (
        serviceMessage.service === "payment" &&
        serviceMessage.status === transaction.status.SUCCESS
      ) {
        console.log(
          "[reply-channel/booking] Create the payment order for booking " +
            serviceMessage.orderPayment.idBooking +
            " : SUCCESSFULL"
        );
        console.log(JSON.stringify(serviceMessage));
        if (responses !== undefined) {
          await bookingController.addBooking(
            requestBody.idTravels,
            requestBody.options,
            serviceMessage.orderPayment.idBooking
          );

          responses.status(200).json(serviceMessage.orderPayment.linkPayment);
        }
      }
    },
  });
};

run();

const { body, validationResult } = require("express-validator");
const { response } = require("express");

bookingRooter.post(
  "/",
  [body("idTravels").isArray(), body("options").isArray()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    responses = res;
    requestBody = req.body;
    await kafkaProducer.produceEvent(requestBody, "price", kafka);
  }
);

module.exports = bookingRooter;
