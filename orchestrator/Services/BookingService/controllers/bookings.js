const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)

db.defaults({ bookings: [] })
    .write()

const bookings = (reqBody) => {
    try {
        db.read()
        return db.get('bookings')
            .filter({idAgency: reqBody.idAgency})
            .value()
    } catch (err) {
        console.error(err);
    }
};

const getAllAgencies = async (idTravel) => {
    db.read()
    const bookings = db.get('bookings')
        .filter(function (booking) {
            return booking.idsTravel.includes(idTravel)
        })
        .value()
    console.log(bookings)
    return bookings

}




module.exports = {
    bookings,
    getAllAgencies
};