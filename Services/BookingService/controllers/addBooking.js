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

    const newBooking = {
        id: body.id,
        idTravel: body.idTravel,
        options: body.options,
        price: body.price
    }
    //console.log(newBooking)
    db.get("bookings").push(newBooking).write();
    console.log("bla")
};

async function getPrice(idTravel,options){
    //TODO: Changer locahost machin par process.env PriceService
    //${process.env.PAYMENT_ADDR}

    return (await axios.post("http://localhost:4005", {
        idTravel: idTravel,
        options: options
    })).data

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