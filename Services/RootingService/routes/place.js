const express = require('express');
const axios = require('axios');

const placeRouter = express.Router();
const registry = require('./registry');

/**
 * GET place/:id
 * id is the id of the train
 */
placeRouter.route('/:id').get(async (req, res) => {
    axios.get(registry.services.place.url + `place/${req.params.id}`)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => {
            res.status(err.response.status).send(err.response.data);
        });
});

module.exports = placeRouter;
