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


module.exports = {
    bookings
};