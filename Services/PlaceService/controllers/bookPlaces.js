const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('data/db.json');
const db = low(adapter);

async function bookPlaces(placesInfo) {
    const bookedTrain = db.get('places')
        .filter({id: placesInfo.id})
        .value()[0];
    // const updatedSeatsFirst = bookedTrain.firstClass - placesInfo.firstClass;
    const updatedSeatsFirst = {
        "noOption": updateSeatsNumber(bookedTrain.firstClass.noOption, placesInfo.firstClass.noOption),
        "bicycle": updateSeatsNumber(bookedTrain.firstClass.bicycle, placesInfo.firstClass.bicycle),
        "plug": updateSeatsNumber(bookedTrain.firstClass.plug, placesInfo.firstClass.plug)
    };
    const updatedSeatsSecond = {
        "noOption": updateSeatsNumber(bookedTrain.secondClass.noOption, placesInfo.secondClass.noOption),
        "bicycle": updateSeatsNumber(bookedTrain.secondClass.bicycle, placesInfo.secondClass.bicycle),
        "plug": updateSeatsNumber(bookedTrain.secondClass.plug, placesInfo.secondClass.plug)
    };

    try {
        db.get('places')
            .find({id: placesInfo.id})
            .assign({firstClass: updatedSeatsFirst})
            .assign({secondClass: updatedSeatsSecond})
            .write();
        return 200;
    } catch (e) {
        throw 'Place Service: Error updating the database';
    }
}

function updateSeatsNumber(current, requested) {
    if (current - requested < 0) throw `Error: Train does not have enough seats`;
    return current - requested;
}

module.exports = {bookPlaces};
