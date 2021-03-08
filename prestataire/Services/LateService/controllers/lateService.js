const fileSync = require("lowdb/adapters/FileSync");

const dotenv = require("dotenv");

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  throw dotenvConfig.error;
}
const bookingAPI = require("../api/bookingAPI");

const { Kafka } = require("kafkajs");

const broker_addr = "" + process.env.BROKERS_ADDR + "";
const kafka = new Kafka({
  clientId: "TravelAPI",
  brokers: [broker_addr],
});

async function produceLate(body) {
  const idsTravels = body["idsTravels"];
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "Late",
    messages: [{ value: JSON.stringify(idsTravels) }],
  });

  await producer.disconnect();
}

module.exports = {
  produceLate,
};
