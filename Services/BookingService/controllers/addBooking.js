const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)

const travelAPI = require('../api/travelApi');

db.defaults({ bookings: [] })
    .write()

const addBooking = async (body) => {
    var id = Math.floor(Math.random() * 200).toString();

    if (idAlreadyExist(id)) {
        throw Error("this id already exist in database");
    }
    //Calculer le prix
    const price = await travelAPI.getPrice(body);

    db.get("bookings").push({"id":id, "idTravels": body.idTravels, "options": body.options}).write();

    //Obtenir un lien de payment pour ce prix
    var payment = await travelAPI.getLinkPayement({payment_method: "Paypal", idBooking: id, currency: "USD", total: price})


    return payment.linkPayment
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