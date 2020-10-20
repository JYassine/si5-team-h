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
         if (checkBookingIdExist(response.data, req.body.idBooking)) {
            return res.status(200).json(paymentController.addOrderPayment(req.body));
         }else{
            throw new exception.BookingIdException("The booking id specified don't exist")
         }
      }).catch((error) => {
         next(error)
      });


   });

const checkBookingIdExist = (bookings, idBooking) => {
   return bookings.filter(booking => booking.id === idBooking).length > 0
}

module.exports = paymentRooter;