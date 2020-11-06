const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)


const paymentRelease = (idBooking) => {
    db.read()
    const booking = db.get('bookings')
        .find(function (booking) {
            return booking.id == idBooking;
        })
        .value()
    
    return booking
}




module.exports = {
    paymentRelease
};