const express = require('express');
const bookingRooter = express.Router();
const bookingController = require('../controllers/addBooking');

const { body, validationResult } = require('express-validator');

bookingRooter.post('/', [body('idTravels').isArray(), body('options').isArray()]
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            bookingController.addBooking(req.body).then(response =>
                {
                    res.status(201).send(response)
                })

        } catch (err) {
            next(err);
        }

    });


module.exports = bookingRooter;