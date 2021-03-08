const express = require('express');

const publicRouter = express.Router();
const travelsRoute = require('./routes/getCustomers'); 

publicRouter.use('/customers', travelsRoute);

module.exports = publicRouter;