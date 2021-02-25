const express = require('express');

const bookingRooter = express.Router();
const bookingController = require('../controllers/getBookings');

bookingRooter.route('/').get((req, res) => {
    try {
        res.status(200).json(bookingController.bookings(req.body));
    } catch (err) {
        console.log(err);
    }
});

bookingRooter.route('/getAllAgencies/:idTravel').get((req, res) => {
    try {
        bookingController.getAllAgencies(req.params.idTravel).then(result =>{
            res.status(200).json(result)
        })

    } catch (err) {
        console.log(err);
    }
})

module.exports = bookingRooter;