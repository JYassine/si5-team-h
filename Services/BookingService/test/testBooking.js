const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const bookingController = require('../controllers/addBooking')
const dotenv = require('dotenv');

const dotenvConfig = dotenv.config()
if (dotenvConfig.error) {
  throw dotenvConfig.error
}


describe('Add a new booking', () => {
  it('should add a new booking in the database', () => {
    nock(`${process.env.PRICE_ADDR}`)
        .post('/price', { idTravels: ["NP1"], options: [] })
        .reply(201, 29)


    console.log("cccc", `${process.env.PAYMENT_ADDR}`)

    nock(`${process.env.PAYMENT_ADDR}`)
        .post('/payment')
        .reply(201, "link.fr")

    bookingController.addBooking({ idTravels: ["NP1"], options: [] })
    db.read()
    /*const booking = db.get('bookings')
      .find({ id: "B1" })
      .value()

    expect(booking.id).to.equal('B1')*/

  });
});








