const express = require('express');

const placeRouter = express.Router();
const placeController = require("../controllers/places.js");

placeRouter.route('/').post(async (req, res) => {
    placeController.getAvailablePlaces(req.body.id)
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.error(err);
            res.status(404).send('Place service: Could not find data');
        });
});

module.exports = placeRouter;
