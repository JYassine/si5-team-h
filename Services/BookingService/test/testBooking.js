const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const bookingController = require('../controllers/addBooking')

const request = { id: "B1", idTravel: "NP1", options: [] }
const requestPrice = {

  idTravel:"NP1",
  options:[]

}

describe('Add a new booking', () => {
  it('should add a new booking in the database', () => {
    //TODO: Mock l'appel de getPrice dans addBooking
    nock('http://localhost:4005')
        .persist()
        .post('/', requestPrice)
        .reply(201, "200")

    bookingController.addBooking(request).then(()=>{
      db.read()
      const booking = db.get('bookings')
          .find({ id: "B1" })
          .value()

      expect(booking.id).to.equal('B1')
        }

    )


  });
});








