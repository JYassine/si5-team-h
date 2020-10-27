const axios = require('axios').default;

const getTravelPrice = async (id) => {

  const priceTravel = await axios.get(`${process.env.TRAVEL_ADDR}/travels/`+id)
    .then(response =>{
      return response.data.price;
    })
    .catch(error => {
      throw new Exception("Error : "+ error);
    });

    return priceTravel;
};

module.exports = {
    getTravelPrice
};