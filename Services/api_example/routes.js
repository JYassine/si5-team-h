const express = require('express');

const publicRouter = express.Router();
const helloRoute = require('./routes/hello'); //Fichier hello.js dans dossier routes

publicRouter.use('/hello', helloRoute);

module.exports = publicRouter;