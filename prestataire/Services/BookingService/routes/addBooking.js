const express = require("express");
const bookingRooter = express.Router();
const bookingController = require("../controllers/addBooking");
const travelAPI = require("../api/travelApi");

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
  clientId: "TravelAPI" + process.env.PRESTATAIRE_ID,
  brokers: [broker_addr],
});

const consumer = kafka.consumer({
  groupId: "new-booking" + process.env.PRESTATAIRE_ID,
});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "new-booking" });
  await consumer.subscribe({ topic: "rollback-booking" });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic === "new-booking") {
        let travels = JSON.parse(message.value.toString());
        console.log(
          "[consumer/" + process.env.PRESTATAIRE_NAME + "] had a new booking..."
        );
        console.log(travels);
        let travelsPresta = [];
        travels.idTravels.forEach((travel) => {
          const travelSplit = travel.split("-");
          console.log("Travel split " + travelSplit);
          if (travelSplit[0] == process.env.PRESTATAIRE_ID) {
            travelsPresta.push(travelSplit[1]);
          }
        });
        travels.idTravels = [];
        console.log(travelsPresta);
        travelsPresta.forEach((travel) => {
          travels.idTravels.push(travel);
        });
        if (travels.idTravels.length > 0) {
          bookingController.addBooking(travels).then(async (res) => {
            if (res !== undefined) {
              for (var i = 0; i < travels.idTravels.length; i++) {
                await travelAPI.updateTravel(travels.idTravels[i]);
              }
            }
          });
        }
      }
      if (topic === "rollback-booking") {
        let booking = JSON.parse(message.value.toString());
        await bookingController.annulationBooking(booking.idBooking);
      }
    },
  });
};

run();
bookingRooter.post(
  "/",
  [body("idTravels").isArray(), body("options").isArray()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    response = res;
  }
);

module.exports = bookingRooter;
