const express = require('express');

const publicRouter = express.Router();
const accountServiceOptions = require('./routes/accountService');

publicRouter.use('/', accountServiceOptions);

module.exports = publicRouter;