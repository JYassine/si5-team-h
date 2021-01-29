const express = require('express');

const publicRouter = express.Router();
const travelsRoute = require('./routes/getTravels'); //Fichier travels.js dans dossier routes

publicRouter.use('/travels', travelsRoute);

module.exports = publicRouter;