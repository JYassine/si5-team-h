const express = require('express');

const travelRouter = express.Router();
const travelController = require('../controllers/travels'); //Fichier travels.js dans le dossier controllers
const customerController = require('../controllers/customerInfo');
const customerApi = require('../api/customerApi');

/**
 * Get all modules statics infos
 */
travelRouter.route('/').get(async (req, res) => {
    try {
        res.json(await travelController.getTravels(req.query));
    } catch (err) {
        next (err);
    }
});

travelRouter.route('/:id').get( async (req,res, next) => {
    try {
        res.json(await travelController.getTravelById(req.params.id));
    } catch (err) {
        next (err);
    }
});

module.exports = travelRouter;
