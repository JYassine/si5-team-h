const express = require('express');
const axios = require('axios');

const travelsRouter = express.Router();
const registry = require("./registry");

/**
 * GET /travels
 */
travelsRouter.route('/').get(async (req, res) => {
    axios.get(process.env.TRAVEL_ADDR + "/travels", {params: req.query})
        .then(response => res.status(response.status).send(response.data))
        .catch(err => console.log("Error fetching travel service data", err));
});

travelsRouter.route('/:id').get(async (req, res) => {
    console.log(process.env.TRAVEL_ADDR + `/travels/${req.params.id}`);
    axios.get(process.env.TRAVEL_ADDR + `/travels/${req.params.id}`)
        .then(response => {
            console.log(response.data);
            res.status(response.status).send(response.data);
        })
        .catch(err => res.status(err.response.status).send(err.response.data))
});


module.exports = travelsRouter;
