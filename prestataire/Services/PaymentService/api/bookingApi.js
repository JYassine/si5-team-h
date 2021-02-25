const axios = require('axios').default;

const getAllBookings = async () => {
  let promiseBooking = await axios.get(`${process.env.BOOKING_ADDR}/bookings`)
    .catch(error => { throw new Error("Error on getting bookings : "+ error) });

  return promiseBooking;
};


const payementRelease = async (idBooking) => {
  axios.get(`${process.env.BOOKING_ADDR}/bookings/paymentRelease/` + idBooking)
    .catch(error => { throw new Error("Error on getting bookings : "+ error) });
};

module.exports = {
  getAllBookings,
  payementRelease
};