const express = require('express');

const publicRouter = express.Router();
const calculatePriceOptions = require('./routes/calculatePriceOptions');

publicRouter.use('/price', calculatePriceOptions);

module.exports = publicRouter;