const express = require('express');

const travelRouter = express.Router();
const travelController = require('../controllers/deleteTravel'); //Fichier travels.js dans le dossier controllers

/**
 * Get all modules statics infos
 */

travelRouter.route('/').post(async (req, res) => {
    try {
        res.json(await travelController.deleteTravel(req.body));
    } catch (err) {
        next (err);
    }
});

module.exports = travelRouter;