const express = require('express');

const placeRouter = express.Router();
const placeController = require("../controllers/bookPlaces.js");

placeRouter.route('/').post(async (req, res) => {
    placeController.bookPlaces(req.body)
        .then(response => res.status(response).send())
        .catch(err => {
            console.error(err);
            res.status(403).send(err);
        });
});

module.exports = placeRouter;
