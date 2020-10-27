const axios = require('axios').default;

const updateTravel = async (id) => {

  axios.post(`${process.env.TRAVEL_ADDR}/deleteTravel`, { idTravel: id })
    .catch(error => console.log("Error on updating travel data", error));
};

module.exports = {
  updateTravel
};