const expect = require('chai').expect;
const axios = require('axios').default;
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const paymentController = require('../controllers/addOrderPayment')
const nock = require('nock')
const dotenv = require('dotenv');

const dotenvConfig = dotenv.config()
if (dotenvConfig.error) {
  throw dotenvConfig.error
}


const requestAddOrderPayment = {
    payment_method: "Paypal",
    idBooking: "1",
    currency: "USD",
    total: "52"
}

describe('Add order payment when booking id exist', function () {

    it('should add on order payment', () => {
        paymentController.addOrderPayment(requestAddOrderPayment).then((response) => {
            nock(`${process.env.PAYMENT_ADDR}`)
                .post('/payment', requestAddOrderPayment)
                .reply(201, response)
        }).then(() => {
            axios.post(`${process.env.PAYMENT_ADDR}/payment`, requestAddOrderPayment)
                .then(response => {
                    expect(response.data).to.not.equal(undefined);
                    expect(response.data.idBooking).to.equal("1")
                    expect(response.data.currency).to.equal("USD");
                    expect(response.data.total).to.equal("52")
                    expect(response.data.payment_method).to.equal("Paypal");
                    expect(response.data.linkPayment).to.equal(`${process.env.PAYMENT_ADDR}/payment/execute/` + response.data.payment_method + "-" + response.data.id);
                })
        }).catch((error) => { throw new Error("Error : " + error) })

    });
});
