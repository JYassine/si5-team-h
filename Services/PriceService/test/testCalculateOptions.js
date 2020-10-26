const expect = require('chai').expect;
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const calculatePriceController = require('../controllers/calculatePriceOptions')

const requestFromBooking = {
    "idTravel": "NP2",
    "options": ["bicycle", "plug"]
}

const idTravelPrice = {
    "id": "NP2",
    "price": 30
}

describe('Calculate options for a booking', function () {
    beforeEach(() => {

        var mock = new MockAdapter(axios);
        mock.onGet(`${process.env.TRAVEL_ADDR}/travels/` + requestFromBooking.idTravel).reply(200,idTravelPrice);

    })

    it('should return the price sum of all options taken ', () => {
        axios.get(`${process.env.TRAVEL_ADDR}/travels/` + requestFromBooking.idTravel)
            .then(response => {
                expect(response.data).to.not.equal(undefined);
                expect(response.data.price).to.equal(30)
                expect(calculatePriceController.calculateTotalPrice(requestFromBooking,response.data.price).totalPrice).to.equal(42);
            })
    })

});

