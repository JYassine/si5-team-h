const express = require('express');

const publicRouter = express.Router();
const placeRoute = require('./routes/getPlaces');


publicRouter.use('/place', placeRoute);


module.exports = publicRouter;
