const express = require('express');
const axios = require('axios');

const helloRouter = express.Router();
const helloController = require('../controllers/hello'); //Fichier hello.js dans le dossier controllers

/**
 * Get all modules statics infos
 */
helloRouter.route('/').get(async (req, res) => {
    try {
        // res.json(await helloController.getHello());
        axios.get('http://localhost:4000/hello')
            .then(response => res.send(response.data))
            .catch(err => console.log(err));
    } catch (err) {
        next (err);
    }
});

module.exports = helloRouter;
