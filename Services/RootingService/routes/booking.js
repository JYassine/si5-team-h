const express = require('express');
const axios = require('axios');

const bookingRouter = express.Router();

/**
 * POST /bookings
 * Payload: {
 *     "id": string,
 *     "idTravel": string
 * }
 */
bookingRouter.route('/').post(async (req, res) => {
    console.log(req.body);
    axios.post(`${process.env.BOOKING_ADDR}/bookings`, req.body)
        .then(response => res.status(response.status).send())
        .catch(err => console.log("Error sending request to booking service", err));
});

/**
 * GET /bookings
 */
bookingRouter.route('/').get(async (req, res) => {
    axios.get(`${process.env.BOOKING_ADDR}/bookings`)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error sending request to booking service", err));
});

module.exports = bookingRouter;
