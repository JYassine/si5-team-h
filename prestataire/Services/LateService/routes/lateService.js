const express = require('express');
const lateServiceRouter = express.Router();
const lateServiceController = require('../controllers/lateService');
const { body, validationResult } = require('express-validator');


lateServiceRouter.post('/lateTravels'
   , (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      lateServiceController.produceLate(req.body).then(response=>{
         res.status(200).json(response);
      });

   });


module.exports = lateServiceRouter;
