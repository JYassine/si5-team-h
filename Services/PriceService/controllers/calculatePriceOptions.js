const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const uniqid = require('uniqid');

db.defaults({ priceBookingOptions: [] })
    .write()

const mapOptions = new Map();

mapOptions.set("bicycle", 10)
mapOptions.set("plug", 2)


function calculatePriceOptions(body) {
    let sumOptions = 0;
    body.options.forEach(option => {
        sumOptions += mapOptions.get(option)
    });
    let bookingOptionsPrice = {
        id: uniqid(body.idBooking + "-"),
        idBooking: body.idBooking,
        priceOptions: sumOptions

    }
    db.get("priceBookingOptions").push(bookingOptionsPrice).write();
    return bookingOptionsPrice;

};



module.exports = {
    calculatePriceOptions
};