const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)

db.defaults({ bookings: [] })
    .write()

const bookings = () => {
    try {
        db.read()
        return db.get('bookings').value()
    } catch (err) {
        console.error(err);
    }
};


module.exports = {
    bookings
};