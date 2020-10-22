const express = require('express');
const axios = require('axios');

const travelsRouter = express.Router();

/**
 * GET /travels
 */
travelsRouter.route('/').get(async (req, res) => {
    axios.get(`${process.env.TRAVEL_ADDR}/travels`)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error fetching travel service data", err));
});


module.exports = travelsRouter;
