const express = require('express');

const travelRouter = express.Router();
const travelController = require('../controllers/getTravels'); //Fichier getTravels.js dans le dossier controllers

/**
 * Get all modules statics infos
 */
travelRouter.route('/').get(async (req, res) => {
    try {
        res.json(await travelController.getTravels());
    } catch (err) {
        next (err);
    }
});


module.exports = travelRouter;