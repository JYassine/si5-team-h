const express = require('express');

const helloRouter = express.Router();
const helloController = require('../controllers/hello'); //Fichier hello.js dans le dossier controllers

/**
 * Get all modules statics infos
 */
helloRouter.route('/').get(async (req, res) => {
    try {
        res.json(await helloController.getHello());
    } catch (err) {
        next (err);
    }
});

module.exports = helloRouter;