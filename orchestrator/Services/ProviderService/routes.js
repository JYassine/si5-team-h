const express = require('express');

const publicRouter = express.Router();
const providersRoute = require('./routes/getProviders'); 

publicRouter.use('/providers', providersRoute);

module.exports = publicRouter;