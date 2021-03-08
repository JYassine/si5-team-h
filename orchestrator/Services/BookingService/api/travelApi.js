const axios = require('axios').default;

const updateTravel = async (id) => {

  axios.post(`${process.env.TRAVEL_ADDR}/deleteTravel`, { idTravel: id })
    .catch(error => console.log("Error on updating travel data", error));
};



const getPrice = async (provider,body) => {
  
  return await axios.post(`${provider.rootingAddress}/price`, body)
    .catch(error => console.log("Error on pricing travel", error))
    .then( (response) => {
      return response.data
    });
};


const getLinkPayement = async (provider,body) => {

  return await axios.post(`${provider.rootingAddress}/payment`, body)
    .catch(error => console.log("Error to get the payement link", error))
    .then( (response) => {
      return response.data
    });
};

module.exports = {
  updateTravel,
  getPrice,
  getLinkPayement
};