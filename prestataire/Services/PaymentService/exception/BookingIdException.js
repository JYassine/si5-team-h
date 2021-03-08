class BookingIdException extends Error {
    constructor(message) {
      super(message)
      this.name = 'BOOKING_ERROR'
      this.message = message
    }
  }

  module.exports = {
    BookingIdException
  };