const express = require('express');
const paymentRooter = express.Router();
const paymentController = require('../controllers/addOrderPayment');
const exception = require('../exception/BookingIdException');
const bookingApi = require('../api/bookingApi');
const { body, validationResult } = require('express-validator');


paymentRooter.post('/',
   [body('payment_method').isString(),
   body('idBooking').isString(),
   body('currency').isString(),
   body('total').isString()]
   , (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      bookingApi.getAllBookings().then((response) => {
         if (!checkBookingIdExist(response.data, req.body.idBooking)) {
            throw new exception.BookingIdException("The booking id specified don't exist")
         }
         return paymentController.addOrderPayment(req.body)

      }).then((response) => {
         return res.status(201).json(response);
      }).
         catch((error) => {
            next(error)
         });


   });

paymentRooter.post('/execute/:id', async (req, res, next) => {

   try {

      const result = await paymentController.validateOrderPayment(req.params.id)
      res.status(200).json(result);
   }catch(err){
      res.status(404).json(err.name +" : "+ err.message);
   }
    


});


const checkBookingIdExist = (bookings, idBooking) => {
   return bookings.filter(booking => booking.id === idBooking).length > 0
}


module.exports = paymentRooter;
