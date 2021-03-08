const express = require('express');

const paymentReleaseRooter = express.Router();
const paymentReleaseController = require('../controllers/paymentRelease');

paymentReleaseRooter.route('/paymentRelease/:idBooking').get((req, res) => {
    try {
        res.status(200).json(paymentReleaseController.paymentRelease(req.params.idBooking));
    } catch (err) {
        console.log(err);
    }
})

module.exports = paymentReleaseRooter;