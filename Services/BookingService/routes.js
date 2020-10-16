const express = require('express');

const publicRouter = express.Router();
const addBooking = require('./routes/addBooking'); 
const bookings = require('./routes/getBookings');

publicRouter.use('/bookings', addBooking);
publicRouter.use('/bookings',bookings);

module.exports = publicRouter;