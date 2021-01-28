const express = require('express');

const publicRouter = express.Router();
const bookings = require('./routes/getBookings');

publicRouter.use('/bookings', bookings);

module.exports = publicRouter;