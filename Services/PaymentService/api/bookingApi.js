const axios = require('axios').default;

const getAllBookings = async () => {
  console.log("coucou ! ", `${process.env.BOOKING_ADDR}/bookings`);
  let promiseBooking = await axios.get(`${process.env.BOOKING_ADDR}/bookings`)
    .catch(error => { throw new Error("Error on getting bookings : "+ error) });

  return promiseBooking;
};

module.exports = {
  getAllBookings
};