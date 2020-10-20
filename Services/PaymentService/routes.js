const express = require('express');

const publicRouter = express.Router();
const addOrderPayment = require('./routes/addOrderPayment'); 

publicRouter.use('/payment', addOrderPayment);

module.exports = publicRouter;