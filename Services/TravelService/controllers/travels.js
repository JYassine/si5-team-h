const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('./db.json')
const db = low(adapter)


db.defaults({ trains: []})
    .write()


if (db.has('trains').value()) { //Reset de la BD avec la liste des trains de départ
    db.get('trains').remove({}).write()
    db.get('trains')
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
                "id": "PB1",
                "from": "Paris",
                "to": "Brest",
                "departureTime": "14h00",
                "arrivingTime": "17h00",
                "price": 19,
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


async function getTravels(request) {
    const from = request.from
    const to = request.to
    const options = request.options
    try {
        db.read()

        var result = []
        var directTrains = db.get('trains')
            .filter({taken: false})
            .filter(function (travel) {
                let allOptionsGood = true
                for (const option in options) {
                    allOptionsGood = travel.options.includes(options[option]) && allOptionsGood
                }
                return allOptionsGood
            })
            .filter({from: from})
            .filter({to: to})
            .value()
            .forEach(element => {
                result.push([element])
            });

            
        var trainsWithGoodFrom = db.get('trains')
            .filter({taken: false})
            .filter(function (travel) {
                let allOptionsGood = true
                for (const option in options) {
                    allOptionsGood = travel.options.includes(options[option]) && allOptionsGood
                }
                return allOptionsGood
            })
            .filter({from: from})
            .filter(function (train) {return to != train.to})
            .value();



        for (var i = 0; i < trainsWithGoodFrom.length; i++){
            db.get('trains')
                .filter({taken: false})
                .filter(function (travel) {
                    let allOptionsGood = true
                    for (const option in options) {
                        allOptionsGood = travel.options.includes(options[option]) && allOptionsGood
                    }
                    return allOptionsGood
                })
                .filter({to: to})
                .filter(function (train) {//Filtre pour que les train ai une correspondance au même endroit
                    return trainsWithGoodFrom[i].to == train.from;
                })
                .filter(function (train) {//Filtre pour que la correspondance soit en raccord avec le temps
                    return trainsWithGoodFrom[i].arrivingTime < train.departureTime;
                })
                .value()
                .forEach(element => {
                    result.push([trainsWithGoodFrom[i], element])
                });
        }


        return result;


    } catch (err) {
        console.error(err)
    }
}

async function travelById(idTravel) {
    try {
        db.read()
        return db.get('trains')
            .find(element => element.id == idTravel)
    } catch (err) {
        console.error(err)
    }
}


module.exports = {
    getTravels,
    getTravelById : travelById
};