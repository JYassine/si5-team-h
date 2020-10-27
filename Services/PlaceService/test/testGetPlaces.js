const expect = require('expect.js');
const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('data/db.json');
const db = low(adapter);
const placeController = require('../controllers/places.js');

describe("Get available seats", () => {
    const id1 = {id: "NP1"};
    const id2 = {id: "NP2"};
    const id3 = {id: "NB1"};
    const id4 = {id: "NB2"};
    const id5 = {id: "NB3"};

    const idResponse =
    {
        id1: {
            "id": "NP1",
                "firstClass": 14,
                "secondClass": 25
        },
        id2: {
            "id": "NP2",
                "firstClass": 26,
                "secondClass": 71
        },
        id3: {
            "id": "NB1",
            "firstClass": 8,
            "secondClass": 21
        },
        id4: {
            "id": "NB2",
            "firstClass": 32,
            "secondClass": 59
        },
        id5: {
            "id": "NB3",
            "firstClass": 22,
            "secondClass": 68
        }
    };

    it("should return the available seats with train ID NP1", () => {
        return placeController.getAvailablePlaces(id1)
            .then(() => {
                db.read();
                const response = db.get('places')
                    .find({id: id1.id})
                    .value();
                expect(response).to.eql(idResponse.id1);
            })
        }
    );
    it("should return the available seats with train ID NP2", () => {
            return placeController.getAvailablePlaces(id2)
                .then(() => {
                    db.read();
                    const response = db.get('places')
                        .find({id: id2.id})
                        .value();
                    expect(response).to.eql(idResponse.id2);
                })
        }
    );
    it("should return the available seats with train ID NB1", () => {
            return placeController.getAvailablePlaces(id3)
                .then(() => {
                    db.read();
                    const response = db.get('places')
                        .find({id: id3.id})
                        .value();
                    expect(response).to.eql(idResponse.id3);
                })
        }
    );
    it("should return the available seats with train ID NB2", () => {
            return placeController.getAvailablePlaces(id4)
                .then(() => {
                    db.read();
                    const response = db.get('places')
                        .find({id: id4.id})
                        .value();
                    expect(response).to.eql(idResponse.id4);
                })
        }
    );
    it("should return the available seats with train ID NB3", () => {
            return placeController.getAvailablePlaces(id5)
                .then(() => {
                    db.read();
                    const response = db.get('places')
                        .find({id: id5.id})
                        .value();
                    expect(response).to.eql(idResponse.id5);
                })
        }
    );
});


