const low = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");
const adapter = new fileSync("db.json");
const db = low(adapter);
require("dotenv").config();
const uniqid = require("uniqid");
const bookingApi = require("../api/bookingApi");
const pathLinkPayment = `${process.env.PAYMENT_ADDR}` + "/payment/execute/";
const exceptionOrder = require("../exception/OrderPaymentNotFoundException");

db.defaults({ orderPayments: [] }).write();

db.defaults({ paymentDone: [] }).write();

async function addOrderPayment(body) {
  let order = constructOrderPayment(body);
  await db.get("orderPayments").push(order).write();
  return order;
}

const constructOrderPayment = (body) => {
  let idOrderPayment = uniqid();
  let order = {
    id: idOrderPayment,
    idBooking: body.idBooking,
    currency: body.currency,
    total: body.total,
    payment_method: body.payment_method,
    linkPayment: pathLinkPayment + body.payment_method + "-" + idOrderPayment,
  };

  return order;
};

const validateOrderPayment = async (linkPaymentId) => {
  const idPayment = linkPaymentId.split("-")[1];
  const orderPayment = await db
    .get("orderPayments")
    .find({ id: idPayment })
    .value();
  if (orderPayment == undefined) {
    throw new exceptionOrder.OrderPaymentNotFoundException(
      "The order payment don't exist"
    );
  }
  var date = new Date(new Date().getTime());
  let statusOrder = {
    id: idPayment,
    status: "SUCCESSFULL",
    transaction_time: date.toString(),
    amount: {
      total: orderPayment.total,
      currency: orderPayment.currency,
      payment_method: orderPayment.payment_method,
    },
  };

  await db.get("paymentDone").push(statusOrder).write();
  await db.get("orderPayments").remove({ id: idPayment }).write();

  await bookingApi.payementRelease(orderPayment.idBooking);

  return statusOrder;
};

module.exports = {
  addOrderPayment,
  validateOrderPayment,
};
