const express = require('express');

const publicRouter = express.Router();
const travelsRoute = require('./routes/travels');
const bookingRoute = require('./routes/booking');
const paymentRoute = require('./routes/payment');

publicRouter.use('/travels', travelsRoute);
publicRouter.use('/bookings', bookingRoute);
publicRouter.use('/payment', paymentRoute);

module.exports = publicRouter;
