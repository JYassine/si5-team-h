const express = require('express');

const providerRouter = express.Router();
const providerController = require('../controllers/providers');

providerRouter.route('/').get(async (req, res) => {
    try {
        return res.json(await providerController.getProviders());
    } catch (err) {
        next(err);
    }
});

providerRouter.route('/:id').get(async (req, res) => {
    try {
        return res.json(await providerController.getProviderById(req.params.id));
    } catch (err) {
        next(err);
    }
});


module.exports = providerRouter;