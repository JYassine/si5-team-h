const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('data/db.json');
const db = low(adapter);

db.defaults({places: []}).write();

// TODO: Add available seats for each option (bike, ...)
// Numbers are the available seats left on each train
if (db.has('places').value()) {
    db.get('places').remove().write();
    db.get('places').push(
        {
            "id": "NP1",
            "firstClass": 14,
            "secondClass": 25
        },
        {
            "id": "NP2",
            "firstClass": 26,
            "secondClass": 71
        },
        {
            "id": "NB1",
            "firstClass": 8,
            "secondClass": 21
        },
        {
            "id": "NB2",
            "firstClass": 32,
            "secondClass": 59
        },
        {
            "id": "NB3",
            "firstClass": 22,
            "secondClass": 68
        }
    )
        .write();
}

async function getAvailablePlaces(trainId) {
    try {
        db.read();
        return db.get('places')
            .filter({id: trainId})
            .value();
    } catch(err) {
        console.err(err);
    }

}

module.exports = {getAvailablePlaces};


