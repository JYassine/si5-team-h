const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const travelApi = require("../api/travelApi")
const db = low(adapter)
const uniqid = require('uniqid');

db.defaults({ priceBookingOptions: [] })
    .write()

const mapOptions = new Map();

mapOptions.set("bicycle", 10)
mapOptions.set("plug", 2)


const getTotalPrice = async (body) => {
    const priceTravel = await travelApi.getTravelPrice(body.idTravel);
    const bookingTotalPrice = calculateTotalPrice(body, priceTravel);
    db.get("priceBookingOptions").push(bookingTotalPrice).write();
    return bookingTotalPrice;

};

const calculateTotalPrice = (body, priceTravel) => {
    var sumOptions = 0;
    if (body.options.length != 0) {
        body.options.forEach(option => {
            sumOptions += mapOptions.get(option)
        });
    }
    let totalP = sumOptions + priceTravel;
    let bookingTotalPrice = {
        id: uniqid(body.idTravel + "-"),
        idTravel: body.idTravel,
        totalPrice: totalP
    }

    return bookingTotalPrice

}



module.exports = {
    getTotalPrice,
    calculateTotalPrice
};