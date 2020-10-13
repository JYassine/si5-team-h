const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('data/db.json')
const db = low(adapter)


db.defaults({ travels: []})
    .write()


if (db.has('travels').value()) { //Reset de la BD avec la liste des voyages de départ
    db.get('travels').remove({}).write()
    db.get('travels')
        .push(
            {
                "id": "NP1",
                "from": "Nice",
                "to": "Paris",
                "departureTime": "9h30",
                "arrivingTime": "15h30",
                "price": 29,
                "taken":false
            },
            {
                "id": "NP2",
                "from": "Nice",
                "to": "Paris",
                "departureTime": "8h30",
                "arrivingTime": "13h00",
                "price": 59,
                "taken":false
            },
            {
                "id": "NB1",
                "from": "Nice",
                "to": "Brest",
                "departureTime": "6h00",
                "arrivingTime": "16h00",
                "price": 89,
                "taken":false
            }
        )
        .write()
}


const getTravels = async () => {
    try {
        db.read()
        return db.get('travels')
            .filter({taken:false})
            .value()
    } catch (err) {
        console.error(err);
    }
};


module.exports = {
    getTravels
};