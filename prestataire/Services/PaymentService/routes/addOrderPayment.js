const express = require("express");
const paymentRooter = express.Router();
const paymentController = require("../controllers/addOrderPayment");
const { body, validationResult } = require("express-validator");
const kafkaProducer = require("../kafka/kafkaProducer");
const transaction = require("../status");
const dotenv = require("dotenv");

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  throw dotenvConfig.error;
}
const { Kafka } = require("kafkajs");
const broker_addr = "" + process.env.BROKERS_ADDR + "";
const kafka = new Kafka({
  clientId: "TravelAPI",
  brokers: [broker_addr],
});
const consumer = kafka.consumer({ groupId: "payment" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "payment", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let booking = JSON.parse(message.value.toString());
      console.log(
        "[consumer/payment] Creating the payment for booking " +
          booking.idBooking
      );
      let orderPayment = await paymentController.addOrderPayment(booking);
      let finalStatus = transaction.status.FAIL;
      if (orderPayment !== undefined) {
        finalStatus = transaction.status.SUCCESS;
      }
      kafkaProducer.produceEvent(
        {
          service: "payment",
          orderPayment: orderPayment,
          status: finalStatus,
        },
        "reply-channel",
        kafka
      );
    },
  });
};

run();
paymentRooter.post(
  "/",
  [
    body("payment_method").isString(),
    body("idBooking").isString(),
    body("currency").isString(),
    body("total").isNumeric(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

paymentRooter.post("/execute/:id", async (req, res, next) => {
  try {
    const result = await paymentController.validateOrderPayment(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err.name + " : " + err.message);
  }
});

const checkBookingIdExist = (bookings, idBooking) => {
  return bookings.filter((booking) => booking.id === idBooking).length > 0;
};

module.exports = paymentRooter;
