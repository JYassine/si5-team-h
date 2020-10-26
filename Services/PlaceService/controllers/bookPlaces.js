const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('data/db.json');
const db = low(adapter);

async function bookPlaces(placesInfo) {
    const bookedTrain = db.get('places')
        .filter({id: placesInfo.id})
        .value();
    const updatedSeatsFirst = bookedTrain[0].firstClass - placesInfo.firstClass;
    const updatedSeatsSecond = bookedTrain[0].secondClass - placesInfo.secondClass;
    if (updatedSeatsFirst < 0) {
        throw `Train ${placesInfo.id} does not have enough seats in first class!`;
    } else if (updatedSeatsSecond < 0) {
        throw `Train ${placesInfo.id} does not have enough seats in second class!`;
    } else {
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
}

module.exports = {bookPlaces};
