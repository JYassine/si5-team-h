const express = require("express");
const paymentRooter = express.Router();
const paymentController = require("../controllers/addOrderPayment");
const exception = require("../exception/BookingIdException");
const bookingApi = require("../api/bookingApi");
const { body, validationResult } = require("express-validator");

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

const consumer = kafka.consumer({
  groupId: "new-payment" + process.env.PRESTATAIRE_ID,
});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "status-booking" });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic === "status-booking") {
        let bookingTransaction = JSON.parse(message.value.toString());
        if (bookingTransaction.status === 0) {
          paymentController.annulationPayment(bookingTransaction.booking);
        }
      }
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

    bookingApi
      .getAllBookings()
      .then((response) => {
        return paymentController.addOrderPayment(req.body);
      })
      .then((response) => {
        return res.status(201).json(response);
      })
      .catch((error) => {
        next(error);
      });
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
