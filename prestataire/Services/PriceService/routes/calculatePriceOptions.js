const express = require("express");
const priceRooter = express.Router();
const calculatePriceController = require("../controllers/calculatePriceOptions");
const { body, validationResult } = require("express-validator");
const kafkaProducer = require("../kafka/kafkaProducer");
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
const transaction = require("../status");

const consumer = kafka.consumer({ groupId: "price" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "price", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let travels = JSON.parse(message.value.toString());
      console.log(
        "[consumer/price] Calculate the price for travels" + travels.idTravels
      );
      let price = await calculatePriceController.getTotalPrice(travels);
      kafkaProducer.produceEvent(
        { service: "price", price: price, status: transaction.status.SUCCESS },
        "reply-channel",
        kafka
      );
    },
  });
};

run();

priceRooter.post(
  "/",
  [body("idTravels").isArray(), body("options").isArray()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    calculatePriceController.getTotalPrice(req.body).then((response) => {
      res.status(200).json(response);
    });
  }
);

module.exports = priceRooter;
