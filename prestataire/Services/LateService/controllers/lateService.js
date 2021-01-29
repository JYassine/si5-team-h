const fileSync = require('lowdb/adapters/FileSync')


const bookingAPI = require("../api/bookingAPI")

const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'TravelAPI',
    brokers: ['localhost:9092']
})

const notifyAgencies = async (body) =>{
    const idsTravels = body["idsTravels"]
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

async function produceLate(body) {
    const idsTravels = body["idsTravels"]
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'Late',
        messages: [
            { value: idsTravels },
        ],
    })

    await producer.disconnect()
}


module.exports = {
    notifyAgencies,
    produceLate
}