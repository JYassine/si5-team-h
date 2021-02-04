const express = require('express');

const publicRouter = express.Router();
const bookings = require('./routes/getBookings');
const addBooking = require('./routes/addBooking');

publicRouter.use('/bookings', bookings);
publicRouter.use('/bookings', addBooking);

module.exports = publicRouter;