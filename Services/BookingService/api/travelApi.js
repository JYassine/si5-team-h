const axios = require('axios').default;

const updateTravel = async (id) => {

  axios.post('http://localhost:4001/deleteTravel', { idTravel: id })
    .catch(error => console.log("Error on updating travel data", error));
};

module.exports = {
  updateTravel
};