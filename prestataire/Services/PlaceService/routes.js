const express = require('express');

const publicRouter = express.Router();
const placeRoute = require('./routes/getPlaces');
const bookPlaceRoute = require('./routes/bookPlaces');


publicRouter.use('/place', placeRoute);
publicRouter.use('/bookPlace', bookPlaceRoute);


module.exports = publicRouter;
