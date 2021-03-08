const express = require('express');
const axios = require('axios');

const customersRouter = express.Router();
const registry = require("./registry");

/**
 * GET /customers
 */
customersRouter.route('/').get(async (req, res) => {
    axios.get(process.env.CUSTOMER_ADDR + `/customers`, {params: req.query})
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error fetching customers service data", err));
});

customersRouter.route('/:id').get(async (req, res) => {
    axios.get(process.env.CUSTOMER_ADDR + `/customers/${req.params.id}`)
        .then(response => {
            console.log(response.data);
            res.status(response.status).send(response.data);
        })
        .catch(err => res.status(err.response.status).send(err.response.data))
});


module.exports = customersRouter;