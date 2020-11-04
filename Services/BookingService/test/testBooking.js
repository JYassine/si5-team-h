const expect = require('chai').expect;
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const bookingController = require('../controllers/addBooking')


describe('Add a new booking', () => {
  beforeEach(()=>{
    const mock = new MockAdapter(axios);
    mock.onPost(`http://localhost:4005/price`).reply(200,100);
  })
  it('should add a new booking in the database', async () => {

    await bookingController.addBooking({ id: "B1", idsTravel: "[NP1]",options:'[]' })
    db.read()
    const booking = db.get('bookings')
      .find({ id: "B1" })
      .value()
    console.log(booking)
    expect(booking.id).to.equal('B1')

  });
});








