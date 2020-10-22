const express = require('express');
const axios = require('axios');

const paymentRouter = express.Router();

paymentRouter.route('/').post(async (req, res) => {
    axios.post(`${process.env.PAYMENT_ADDR}/payment`, req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error requesting payment service", err));
});

module.exports = paymentRouter;
