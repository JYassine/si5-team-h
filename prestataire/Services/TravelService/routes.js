const express = require('express');

const publicRouter = express.Router();
const travelsRoute = require('./routes/getTravels'); //Fichier travels.js dans dossier routes
const deleteTravelRoute = require('./routes/deleteTravel'); //Fichier travels.js dans dossier routes

publicRouter.use('/travels', travelsRoute);
publicRouter.use('/deleteTravel',deleteTravelRoute);

module.exports = publicRouter;