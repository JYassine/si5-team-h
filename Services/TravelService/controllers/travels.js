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
                "options":[],
                "taken":false
            },
            {
                "id": "NP2",
                "from": "Nice",
                "to": "Paris",
                "departureTime": "8h30",
                "arrivingTime": "13h00",
                "price": 59,
                "options":["bicycle","plug"],
                "taken":false
            },
            {
                "id": "NB1",
                "from": "Nice",
                "to": "Brest",
                "departureTime": "6h00",
                "arrivingTime": "16h00",
                "price": 89,
                "options":["bicycle","plug"],
                "taken":false
            },
            {
                "id": "NB2",
                "from": "Nice",
                "to": "Brest",
                "departureTime": "6h00",
                "arrivingTime": "16h00",
                "price": 89,
                "options":["bicycle"],
                "taken":false
            },
            {
                "id": "NB3",
                "from": "Nice",
                "to": "Brest",
                "departureTime": "6h00",
                "arrivingTime": "16h00",
                "price": 89,
                "options":["plug"],
                "taken":false
            }
        )
        .write()
}




async function travels(request) {
    const options = request.options
    try {
        db.read()
        return db.get('travels')
            .filter({taken: false})
            .filter(function (travel) {
                let allOptionsGood = true
                for (const option in options) {
                    allOptionsGood = travel.options.includes(options[option]) && allOptionsGood
                }
                return allOptionsGood
            })
            .value()
    } catch (err) {
        console.error(err)
    }
}

async function travels(request) {
    const options = request.options
    try {
        db.read()
        return db.get('travels')
            .filter({taken: false})
            .filter(function (travel) {
                let allOptionsGood = true
                for (const option in options) {
                    allOptionsGood = travel.options.includes(options[option]) && allOptionsGood
                }
                return allOptionsGood
            })
            .value()
    } catch (err) {
        console.error(err)
    }
}

async function travelById(idTravel) {
    try {
        db.read()
        return db.get('travels')
            .find(element => element.id == idTravel)
    } catch (err) {
        console.error(err)
    }
}


module.exports = {
    getTravels: travels,
    getTravelById : travelById
};