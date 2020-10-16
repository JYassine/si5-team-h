const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const bookingController = require('../controllers/addBooking')

describe('Booking already exist in database', () => {
    it('should throw an error when a same booking in the database is added twice', () => {
        try {
            bookingController.addBooking({ id: "B1" , idTravel : "NP1"})
        } catch (err) {
            expect(err.message).to.eql('this id already exist in database')
            db.get('bookings')
                .remove({ id: "B1"})
                .write();
        }
    });
});
