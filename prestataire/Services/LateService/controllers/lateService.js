const fileSync = require('lowdb/adapters/FileSync')


const bookingAPI = require("../api/bookingAPI")

const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'TravelAPI',
    brokers: ['kafka:9092']
})


async function produceLate(body) {
    const idsTravels = body["idsTravels"]
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'Late',
        messages: [
            { value: JSON.stringify(idsTravels)},
        ],
    })

    await producer.disconnect()
}


module.exports = {
    produceLate
}