const express = require('express');

const publicRouter = express.Router();
const travelsRoute = require('./routes/travels');
const bookingRoute = require('./routes/booking');
const paymentRoute = require('./routes/payment');
const placeRoute = require('./routes/place');
const accountRoute = require('./routes/account');
const customerRoute = require('./routes/customer');

publicRouter.use('/travels', travelsRoute);
publicRouter.use('/bookings', bookingRoute);
publicRouter.use('/payment', paymentRoute);
publicRouter.use('/place', placeRoute);
publicRouter.use('/account', accountRoute);
publicRouter.use('/customers', customerRoute);

module.exports = publicRouter;
