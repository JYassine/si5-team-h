const express = require('express');
const bookingRooter = express.Router();
const bookingController = require('../controllers/addBooking');
const travelAPI = require('../api/travelApi');

const { body, validationResult } = require('express-validator');

bookingRooter.post('/', [body('id').isString(), body('idTravel').isString()]
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            res.status(201).json(bookingController.addBooking(req.body));
            travelAPI.updateTravel(req.body.idTravel)
        } catch (err) {
            next(err);
        }

    });


module.exports = bookingRooter;