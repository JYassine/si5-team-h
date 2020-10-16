const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const bookingController = require('../controllers/addBooking')


describe('Add a new booking', () => {
  it('should add a new booking in the database', () => {
    bookingController.addBooking({ id: "B1", idTravel: "NP1" })
    db.read()
    const booking = db.get('bookings')
      .find({ id: "B1" })
      .value()

    expect(booking.id).to.equal('B1')

  });
});








