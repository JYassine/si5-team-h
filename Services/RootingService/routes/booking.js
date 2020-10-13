const express = require('express');
const axios = require('axios');

const bookingRouter = express.Router();
const registry = require("./registry");

bookingRouter.route('/').post(async (req, res) => {
    axios.post(registry.services.booking + 'book')
        .then(response => res.status(200).send())
        .catch(err => console.log("Error sending request to booking service", err));
});

module.exports = bookingRouter;
