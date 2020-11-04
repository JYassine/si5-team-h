const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)

const travelAPI = require('../api/travelApi');

db.defaults({ bookings: [] })
    .write()

const addBooking = async (body) => {
    var id = 1

    if (idAlreadyExist(id)) {
        throw Error("this id already exist in database");
    }
    //Calculer le prix
    const price = await travelAPI.getPrice(body);

    console.log("price : ", price)

    //Obtenir un lien de payment pour ce prix
    /*var link = await travelAPI.getLinkPayement({payment_method: "Paypal", idBooking: id, currency: "USD", total: price})

    console.log(link)

    db.get("bookings").push(body).write();*/

    return "link"
};


const idAlreadyExist = (idBooking) => {
    const idAlreadyExist = db.get('bookings')
        .find({ id: idBooking })
        .value();

    return idAlreadyExist !== undefined;

}

module.exports = {
    addBooking
};