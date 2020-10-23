const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const db = low(adapter)
const uniqid = require('uniqid');
const dotenv = require('dotenv');

const dotenvConfig = dotenv.config()
if (dotenvConfig.error) {
  throw dotenvConfig.error
}
const pathLinkPayment = `${process.env.PAYMENT_ADDR}/payment/execute/`;

db.defaults({ orderPayments: [] })
    .write()

async function addOrderPayment(body) {

    let order = constructOrderPayment(body)
    await db.get("orderPayments").push(order).write();

    return order;

};


const constructOrderPayment = (body) => {

    let idOrderPayment = uniqid();
    let order = {
        id: idOrderPayment,
        idBooking: body.idBooking,
        currency: body.currency,
        total: body.total,
        payment_method: body.payment_method,
        linkPayment: pathLinkPayment + body.payment_method + '-' + idOrderPayment
    }

    return order;
}


module.exports = {
    addOrderPayment
};