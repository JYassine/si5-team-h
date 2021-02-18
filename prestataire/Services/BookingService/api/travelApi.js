const axios = require('axios').default;

const updateTravel = async (id) => {

  axios.post(`${process.env.TRAVEL_ADDR}/deleteTravel`, { idTravel: id })
    .catch(error => Error("Error on updating travel data", error));
};


const getPrice = async (body) => {
  
  return await axios.post(`${process.env.PRICE_ADDR}/price`, body)
    .catch(error => console.log("Error on pricing travel", error))
    .then( (response) => {
      return response.data
    });
};


const getLinkPayement = async (body) => {

  return await axios.post(`${process.env.PAYMENT_ADDR}/payment`, body)
    .then( (response) => {
      return response.data
    }).catch(error => console.log("Error to get the payement link", error))
    
};

module.exports = {
  updateTravel,
  getPrice,
  getLinkPayement
};