const express = require('express');
const axios = require('axios');

const paymentRouter = express.Router();
const registry = require("./registry");

paymentRouter.route('/').post(async (req, res) => {
    axios.post(process.env.PAYMENT_ADDR + '/payment', req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error requesting payment service", err));
});

paymentRouter.route('/execute/:id').post(async (req, res) => {
    axios.post(process.env.PAYMENT_ADDR +`/execute/${req.params.id}`)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error requesting payment service", err));
});

module.exports = paymentRouter;
