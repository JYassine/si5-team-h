class OrderPaymentNotFoundException extends Error {
    constructor(message) {
      super(message)
      this.name = 'ORDER_PAYMENT_NOT_FOUND'
      this.message = message
    }
  }

  module.exports = {
    OrderPaymentNotFoundException
  };