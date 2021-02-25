const express = require('express');

const publicRouter = express.Router();
const lateServiceRoute = require('./routes/lateService');

publicRouter.use('/', lateServiceRoute);
module.exports = publicRouter;