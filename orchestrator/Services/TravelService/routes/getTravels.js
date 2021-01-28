const express = require('express');

const travelRouter = express.Router();
const travelController = require('../controllers/travels'); //Fichier travels.js dans le dossier controllers
const customerController = require('../controllers/customerInfo');
const customerApi = require('../api/customerApi');

module.exports = travelRouter;
