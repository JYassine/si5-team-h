const providersApi = require('../api/providers');
const axios = require('axios').default;


const paymentRelease = async (idBooking) => {

    var providers = await providersApi.getProviders();
    var allPaymentsRelease = []
    for (provider of providers){
        paymentsRelease = await (axios.get(`${provider.routingAddress}/bookings/paymentRelease/`+idBooking)).data
        allPaymentsRelease.push(paymentsRelease)
    }

    return allPaymentsRelease;
}




module.exports = {
    paymentRelease
};