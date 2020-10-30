const expect = require('expect.js');
const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('data/db.json');
const db = low(adapter);
const bookPlaceController = require('../controllers/bookPlaces');
const placeController = require('../controllers/places');

describe("Book seats", () => {
    const booking = {
        "id": "NB1",
        "firstClass":  {
            "noOption": 2,
            "bicycle": 1,
            "plug": 2
        },
        "secondClass": {
            "noOption": 4,
            "bicycle": 4,
            "plug": 1
        }
    };

    const expectedResult = {
        "id": "NB1",
        "firstClass": {
            "noOption": 9,
            "bicycle": 4,
            "plug": 6
        },
        "secondClass": {
            "noOption": 21,
            "bicycle": 15,
            "plug": 8
        }
    };

    beforeEach(() => placeController.resetDatabase());

    it("should remove the requested seats from the database", () => {
        return bookPlaceController.bookPlaces(booking)
            .then(() => {
                db.read();
                const result = db.get('places')
                    .find({id: booking.id})
                    .value();
                expect(result).to.eql(expectedResult);
            })
    });

    // it("should NOT accept if client requests more seats than available", () => {
    //
    //
    // })




});
