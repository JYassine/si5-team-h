const express = require('express');

const placeRouter = express.Router();
const placeController = require("../controllers/places.js");

placeRouter.route('/:id').get(async (req, res) => {
    placeController.getAvailablePlaces(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send('No train found for this id');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(404).send('Place service: Could not find data');
        });
});

module.exports = placeRouter;
