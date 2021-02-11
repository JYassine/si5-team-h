const express = require('express');
const axios = require('axios');

const bookingRouter = express.Router();
const registry = require("./registry");

/**
 * POST /bookings
 * Payload: {
 *     "id": string,
 *     "idTravels": [string]
 * }
 */
bookingRouter.route('/').post(async (req, res) => {
    axios.post(process.env.BOOKING_ADDR + '/bookings', req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error sending request to booking service", err));
});

/**
 * GET /bookings
 */
bookingRouter.route('/').get(async (req, res) => {
    axios.get(process.env.BOOKING_ADDR + "/bookings")
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error sending request to booking service", err));
});

/**
 * GET All agencies 
 */
bookingRouter.route('/getAllAgencies/:idTravel').get(async (req, res) => {
    axios.get(process.env.BOOKING_ADDR + `/bookings/getAllAgencies/${req.params.idTravel}`)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error sending request to booking service", err));
});

/**
 * GET payment release
 */
bookingRouter.route('/paymentRelease/:idBooking').get(async (req, res) => {
    axios.get(process.env.BOOKING_ADDR + `/bookings/paymentRelease/${req.params.idBooking}`)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error sending request to booking service", err));
});



module.exports = bookingRouter;
