const express = require('express');
const bookingRooter = express.Router();
const bookingController = require('../controllers/addBooking');
const travelAPI = require('../api/travelApi');

const { body, validationResult } = require('express-validator');

bookingRooter.post('/', [body('idTravels').isArray(), body('options').isArray()]
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            res.status(201).json(bookingController.addBooking(req.body));

            for (var i = 0; i < req.body.idTravels.length; i++){
                travelAPI.updateTravel(req.body.idTravels[i])
            }

        } catch (err) {
            next(err);
        }

    });


module.exports = bookingRooter;