const express = require('express');
const axios = require('axios');

const accountRouter = express.Router();

/**
 * POST account/inscription
 */
accountRouter.route('/inscription').post(async (req, res) => {
    axios.post(process.env.ACCOUNT_ADDR + '/inscription', req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send(err.response.data));
});

/**
 * GET account/connexion
 */
accountRouter.route('/connexion').get(async (req, res) => {
    axios.get(process.env.ACCOUNT_ADDR + '/connexion', req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send(err.response.data));
});

/**
 * GET /account
 */
accountRouter.route('/').get(async (req, res) => {
    axios.get(process.env.ACCOUNT_ADDR + '/account', req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send(err.response.data));
});

module.exports = accountRouter;
