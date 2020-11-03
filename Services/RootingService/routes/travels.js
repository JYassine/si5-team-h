const express = require('express');
const axios = require('axios');

const travelsRouter = express.Router();
const registry = require("./registry");

/**
 * GET /travels
 */
travelsRouter.route('/').get(async (req, res) => {
    axios.get(registry.services.travels.url + "travels", {params: req.query})
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error fetching travel service data", err));
});


module.exports = travelsRouter;
