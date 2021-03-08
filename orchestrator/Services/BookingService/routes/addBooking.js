const express = require("express");
const bookingRooter = express.Router();
const bookingController = require("../controllers/addBooking");
const dotenv = require("dotenv");
const { body, validationResult } = require("express-validator");

const kafkaProducer = require("../kafka/kafkaProducer");

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

let response;

const consumer = kafka.consumer({ groupId: "status-booking" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "status-booking" });

  await consumer.subscribe({ topic: "status-payment" });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic === "status-booking") {
        let bookingTransaction = JSON.parse(message.value.toString());
        console.log(
          "[consumer/bookingOrchestrator] Transaction of booking : " +
            bookingTransaction.booking +
            " , status : " +
            bookingTransaction.status
        );
        if (bookingTransaction.status === 0) {
          if (response !== undefined) {
            kafkaProducer.produceEvent(
              { idBooking: bookingTransaction.booking },
              "rollback-booking",
              kafka
            );

            console.log(
              "[consumer/bookingOrchestrator] : Transaction fail for " +
                bookingTransaction.booking
            );
          }
        } else {
          response.status(200).send(bookingTransaction);
        }
      }
      if (topic === "status-payment") {
        let paymentTransaction = JSON.parse(message.value.toString());

        if (paymentTransaction.status === 0) {
          kafkaProducer.produceEvent(
            { idBooking: paymentTransaction.booking },
            "rollback-booking",
            kafka
          );
          console.log(
            "[consumer/bookingOrchestrator] Validation of payment for booking " +
              paymentTransaction.booking +
              " fail"
          );
        }
      }
    },
  });
};

run();

bookingRooter.post(
  "/",
  [body("idTravels").isArray(), body("options").isArray()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    response = res;
    try {
      kafkaProducer.produceEvent(
        {
          idTravels: req.body.idTravels,
          options: req.body.options,
        },
        "new-booking",
        kafka
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = bookingRooter;
