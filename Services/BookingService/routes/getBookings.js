const express = require('express');

const bookingRooter = express.Router();
const bookingController = require('../controllers/bookings');

bookingRooter.route('/').get((req, res) => {
    try {
        res.status(200).json(bookingController.bookings());
    } catch (err) {
        next(err);
    }
});


module.exports = bookingRooter;