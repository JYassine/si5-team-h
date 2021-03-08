const express = require('express');

const travelRouter = express.Router();
const travelController = require('../controllers/deleteTravel'); //Fichier travels.js dans le dossier controllers

/**
 * Get all modules statics infos
 */

travelRouter.route('/').post(async (req, res,next) => {
    try {
        const status = await travelController.deleteTravel(req.body);
        switch (status) {
            case 200:
                res.status(200).json("The travel " + req.body.idTravel + " is no longer available.")
                break
            case 204:
                res.status(204).json("The travel " + req.body.idTravel + " doesn't exist.")
                break
        }

    } catch (err) {
        res.status(204)
        next(err)
    }
});

module.exports = travelRouter;