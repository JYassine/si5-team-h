const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const axios = require('axios').default;

db.defaults({ bookings: [] })
    .write()

const addBooking = async (body) => {

    if (idAlreadyExist(body.id)) {
        throw Error("this id already exist in database");
    }
    const idTravel = body.idTravel
    const options = body.options
    body.price = await getPrice(idTravel, options)
    db.get("bookings").push(body).write();
    console.log("bla")
};

async function getPrice(idTravel,options){
    return await axios.post('http://localhost:4005',{
        idTravel:idTravel,
        options:options
    })
}


const idAlreadyExist = (idBooking) => {
    const idAlreadyExist = db.get('bookings')
        .find({ id: idBooking })
        .value();

    return idAlreadyExist !== undefined;

}

module.exports = {
    addBooking
};