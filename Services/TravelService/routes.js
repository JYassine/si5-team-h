const express = require('express');

const publicRouter = express.Router();
const getTravelsRoute = require('./routes/getTravels'); //Fichier getTravels.js dans dossier routes
const deleteTravelRoute = require('./routes/deleteTravel'); //Fichier getTravels.js dans dossier routes

publicRouter.use('/getTravels', getTravelsRoute);
publicRouter.use('/deleteTravel',deleteTravelRoute);

module.exports = publicRouter;