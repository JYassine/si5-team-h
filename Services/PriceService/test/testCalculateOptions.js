const expect = require('chai').expect;
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const calculatePriceController = require('../controllers/calculatePriceOptions')

const requestFromBooking1 = {
    "idTravel": "NP2",
    "options": ["bicycle", "plug"]
}

const idTravelPrice1 = {
    "id": "NP2",
    "price": 30
}

const requestFromBooking2 = {
    "idTravel": "PB1",
    "options": ["bicycle", "plug"]
}

const idTravelPrice2 = {
    "id": "PB1",
    "price": 40
}

const requestFromBookingNoOptions = {
    "idTravel": "NP1",
    "options": []
}

const idTravelPrice3 = {
    "id": "NP1",
    "price": 20
}



describe('Calculate options for a booking', function () {
    beforeEach(() => {

        var mock = new MockAdapter(axios);
        mock.onGet(`${process.env.TRAVEL_ADDR}/travels/` + requestFromBooking1.idTravel).reply(200,idTravelPrice1);

        mock.onGet(`${process.env.TRAVEL_ADDR}/travels/` + requestFromBooking2.idTravel).reply(200,idTravelPrice2);
        
        mock.onGet(`${process.env.TRAVEL_ADDR}/travels/` + requestFromBookingNoOptions.idTravel).reply(200,idTravelPrice3);

    })

    it('should return the price sum of all options taken ', () => {
        axios.get(`${process.env.TRAVEL_ADDR}/travels/` + "NP2")
            .then(response => {
                expect(response.data).to.not.equal(undefined);
                expect(response.data.price).to.equal(30)
                expect(calculatePriceController.calculateTotalPrice({idTravels:["NP2"], options: ["bicycle", "plug"]},response.data.price).totalPrice).to.equal(42);
            })
    })

    it('should return the price sum with no options ', () => {
        axios.get(`${process.env.TRAVEL_ADDR}/travels/` + requestFromBookingNoOptions.idTravel)
            .then(response => {
                expect(response.data).to.not.equal(undefined);
                expect(response.data.price).to.equal(20)
                expect(calculatePriceController.calculateTotalPrice({idTravels:["NP1"], options: []},response.data.price).totalPrice).to.equal(20);
            })
    })

    it('should return the price sum of all options taken with a 2 trains', () => {
        expect(calculatePriceController.calculateTotalPrice({idTravels:["NP1", "PB1"], options: ["bicycle", "plug"]}, 70).totalPrice).to.equal(82);
    })


    it('should return the price sum of all options taken with a 2 trains from route', () => {
        calculatePriceController.getTotalPrice({idTravels:["NP2", "PB1"], options:["bicycle", "plug"]}).then(response => {
            expect(response.totalPrice).to.equal(82);
        })
    })

});

