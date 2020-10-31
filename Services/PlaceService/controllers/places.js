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
            "firstClass": {
                "noOption": 14,
                "bicycle": 0,
                "plug": 0
            },
            "secondClass": {
                "noOption": 25,
                "bicycle": 0,
                "plug": 0
            }
        },
        {
            "id": "NP2",
            "firstClass": {
                "noOption": 14,
                "bicycle": 5,
                "plug": 10
            },
            "secondClass": {
                "noOption": 19,
                "bicycle": 20,
                "plug": 21
            }
        },
        {
            "id": "NB1",
            "firstClass": {
                "noOption": 11,
                "bicycle": 5,
                "plug": 8
            },
            "secondClass": {
                "noOption": 25,
                "bicycle": 19,
                "plug": 9
            }
        },
        {
            "id": "NB2",
            "firstClass": {
                "noOption": 19,
                "bicycle": 10,
                "plug": 0
            },
            "secondClass": {
                "noOption": 29,
                "bicycle": 20,
                "plug": 0
            }
        },
        {
            "id": "NB3",
            "firstClass": {
                "noOption": 15,
                "bicycle": 0,
                "plug": 11
            },
            "secondClass": {
                "noOption": 32,
                "bicycle": 0,
                "plug": 21
            }
        }
    )
        .write();
}

async function getAvailablePlaces(trainId) {
    try {
        db.read();
        return db.get('places')
            .filter({id: trainId})
            .value()[0];
    } catch(err) {
        console.err(err);
    }
}

function resetDatabase() {
    db.get('places').remove().write();
    db.get('places').push(
        {
            "id": "NP1",
            "firstClass": {
                "noOption": 14,
                "bicycle": 0,
                "plug": 0
            },
            "secondClass": {
                "noOption": 25,
                "bicycle": 0,
                "plug": 0
            }
        },
        {
            "id": "NP2",
            "firstClass": {
                "noOption": 14,
                "bicycle": 5,
                "plug": 10
            },
            "secondClass": {
                "noOption": 19,
                "bicycle": 20,
                "plug": 21
            }
        },
        {
            "id": "NB1",
            "firstClass": {
                "noOption": 11,
                "bicycle": 5,
                "plug": 8
            },
            "secondClass": {
                "noOption": 25,
                "bicycle": 19,
                "plug": 9
            }
        },
        {
            "id": "NB2",
            "firstClass": {
                "noOption": 19,
                "bicycle": 10,
                "plug": 0
            },
            "secondClass": {
                "noOption": 29,
                "bicycle": 20,
                "plug": 0
            }
        },
        {
            "id": "NB3",
            "firstClass": {
                "noOption": 15,
                "bicycle": 0,
                "plug": 11
            },
            "secondClass": {
                "noOption": 32,
                "bicycle": 0,
                "plug": 21
            }
        }
    )
        .write();
}

module.exports = {getAvailablePlaces, resetDatabase};


