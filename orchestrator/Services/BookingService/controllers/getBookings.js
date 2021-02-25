const providersApi = require('../api/providers');
const axios = require('axios').default;

const bookings = async (reqBody) => {
    let providers = await providersApi.getProviders();
    var allBookings = []
    for (provider of providers){
        let booking = (await (axios.get(`${provider.routingAddress}/bookings`, reqBody))).data
        allBookings.push(booking);
    }
    return allBookings;
};

const getAllAgencies = async (idTravel) => {

    var providers =  (await providersApi.getProviders());
    var agenciesWithAtLeastOneTravel = []
    for (provider of providers){
        bookingsAgencies = (await(axios.get(`${provider.routingAddress}/bookings/getAllAgencies/`+idTravel))).data
        agenciesWithAtLeastOneTravel.push(bookingsAgencies);
    }
    
    return agenciesWithAtLeastOneTravel

}




module.exports = {
    bookings,
    getAllAgencies
};