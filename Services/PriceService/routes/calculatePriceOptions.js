const express = require('express');
const priceRooter = express.Router();
const calculatePriceController = require('../controllers/calculatePriceOptions');
const { body, validationResult } = require('express-validator');


priceRooter.post('/',
   [body('idTravels').isString(),
   body('options').isArray()]
   , (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      calculatePriceController.getTotalPrice(req.body).then(response=>{
         res.status(200).json(response);
      });

   });

module.exports = priceRooter;
