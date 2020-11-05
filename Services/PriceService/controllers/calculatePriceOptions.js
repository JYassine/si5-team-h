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
    //On va chercher le prix de tout les trains et on les aditionne
    var priceTravel = 0
    for (var i = 0; i < body.idTravels.length; i++){
        priceTravel += await travelApi.getTravelPrice(body.idTravels[i]);
    }

    //On ajoute le prix des options
    const bookingTotalPrice = calculateTotalPrice(body, priceTravel);

    //On ajoute le resultat dans la BDD
    db.get("priceBookingOptions").push(bookingTotalPrice).write();

    return bookingTotalPrice.totalPrice;
};

//Retourne un JSON contenant le prix final en prenant en parametre les trains et le prix de base de ces derniers
const calculateTotalPrice = (body, priceTravel) => {
    //Calcul le prix des options
    var sumOptions = 0;
    if (body.options.length != 0) {
        console.log("opt", body.options)
        body.options.forEach(option => {
            sumOptions += mapOptions.get(option)
        });
    }

    //L'aditionne au prix des trains
    let totalP = sumOptions + priceTravel;

    //Creer le JSON pour la BDD
    let bookingTotalPrice = {
        id: uniqid(body.idTravels + "-"),
        idTravels: body.idTravels,
        totalPrice: totalP
    }

    return bookingTotalPrice
}



module.exports = {
    getTotalPrice,
    calculateTotalPrice
};