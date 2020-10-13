const express = require('express');
const axios = require('axios');

const travelsRouter = express.Router();
const registry = require("./registry");


travelsRouter.route('/').get(async (req, res) => {
    axios.get(registry.services.travels.url + "travels")
        .then(response => res.status(200).send(response.data))
        .catch(err => console.log("Error fetching travel service data", err));
});


module.exports = travelsRouter;
