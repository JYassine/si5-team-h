const expect = require('chai').expect;
const axios = require('axios').default;
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const calculatePriceController = require('../controllers/calculatePriceOptions')

const requestFromBooking = {
    "idBooking" : "1",
    "options" : ["bicycle", "plug"]
}
describe('Calculate options for a booking', function () {

    it('should return the price sum of all options taken ', () => {
        const bodyResponse= calculatePriceController.calculatePriceOptions(requestFromBooking);
        expect(bodyResponse.priceOptions).to.equal(12);
        db.get('priceBookingOptions').remove({ idBooking: "1"}).write();

    });
});
