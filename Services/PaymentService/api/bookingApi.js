const axios = require('axios').default;

const getAllBookings = async () => {

  let promiseBooking = await axios.get('http://localhost:4004/bookings/')
    .catch(error => { throw new Error("Error on getting bookings : "+ error) });

  return promiseBooking;
};

module.exports = {
  getAllBookings
};