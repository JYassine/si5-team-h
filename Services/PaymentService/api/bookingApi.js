const axios = require('axios').default;

const getAllBookings = async () => {

  let promiseBooking = await axios.get(`${process.env.BOOKING_ADDR}/bookings/`)
    .catch(error => { throw new Error("Error on getting bookings : "+ error) });

  return promiseBooking;
};

module.exports = {
  getAllBookings
};