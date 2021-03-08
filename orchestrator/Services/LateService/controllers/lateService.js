const fileSync = require('lowdb/adapters/FileSync')

const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'TravelAPI',
    brokers: ['kafka:9092']
})


const bookingAPI = require("../api/bookingAPI")

const notifyAgencies = async (idsTravels) =>{
    let agenciesToNotify = []
    for (const idTravel of idsTravels) {
        const agencies = await bookingAPI.getAgencies(idTravel)
        agenciesToNotify.push({
            idTravel,
            agencies
        })
    }
    await sendEmails(agenciesToNotify)
    return agenciesToNotify
}


const sendEmails = async (agenciesToNotify) =>{
    for (const travel of agenciesToNotify){
        for (const agency of travel.agencies){
            console.log("Send email to "+agency.mail+": The Travel "+travel.idTravel+" is late ")
        }
    }
}

async function getLateMessages() {
    const consumer = kafka.consumer({groupId: 'lateService'})

    await consumer.connect()
    await consumer.subscribe({topic: "Late", fromBeginning: true})
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log("Message reçu par Kafka: "+message.value.toString())
            await notifyAgencies(message.value.toString())
        },

    })
}


module.exports = {
    notifyAgencies,getLateMessages
}