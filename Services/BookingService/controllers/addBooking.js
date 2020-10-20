const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)

db.defaults({ bookings: [] })
    .write()

const addBooking = (body) => {

    if (idAlreadyExist(body.id)) {
        throw Error("this id already exist in database");
    }
    db.get("bookings").push(body).write();
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