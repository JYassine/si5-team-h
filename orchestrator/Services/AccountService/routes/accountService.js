const express = require('express');
const accountRouter = express.Router();
const accountServiceController = require('../controllers/accountService');
const { body, validationResult } = require('express-validator');


accountRouter.post('/inscription'
   , (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      accountServiceController.inscription(req.body).then(response=>{
         res.status(200).json(response);
      });

   });
accountRouter.get('/connexion', (req, res, next) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
       }

       accountServiceController.connection(req.body).then(response=>{
          res.status(200).json(response);
       });

    });
accountRouter.get('/account', (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   accountServiceController.getInfos(req.body).then(response=>{
      res.status(200).json(response);
   });

});
module.exports = accountRouter;
