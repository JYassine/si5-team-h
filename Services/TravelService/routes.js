const express = require('express');

const publicRouter = express.Router();
const travelRoute = require('./routes/travels'); //Fichier travels.js dans dossier routes

publicRouter.use('/getTravels', travelRoute);

module.exports = publicRouter;