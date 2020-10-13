const express = require('express');

const publicRouter = express.Router();
const travelsRoute = require('./routes/travels');
const bookingRoute = require('./routes/booking');

publicRouter.use('/travels', travelsRoute);
publicRouter.use('/book', bookingRoute);

module.exports = publicRouter;
