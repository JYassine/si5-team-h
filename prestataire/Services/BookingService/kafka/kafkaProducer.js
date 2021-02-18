
 exports.produceEvent = async function produceEvent(mess,nameTopic,kafkaClient) {
    const producer = kafkaClient.producer()
    await producer.connect()
    await producer.send({
        topic: nameTopic,
        messages: [
            { value : JSON.stringify(mess) },
        ],
    })
 
    await producer.disconnect()
 }
