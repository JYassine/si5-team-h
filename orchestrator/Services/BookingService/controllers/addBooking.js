const providersApi = require('../api/providers');
const axios = require('axios').default;
const travelAPI = require('../api/travelApi');


const addBooking = async (body) => {

    let providers = await providersApi.getProviders();
    var allTravelsProviders = []
    var allLinkPayment = []
    for (provider of providers) {
        allTravelsProviders.push({ "provider": provider, "idTravels": [], "options": body.options });
    }
    for (idTravel of body.idTravels) {
        let providerId = idTravel.split(":")[0];
        let providerTravelId = idTravel.split(":")[1];
        let travelsProvider = allTravelsProviders.find(provider => provider.provider.id === providerId)
        travelsProvider.idTravels.push(providerTravelId)
    }

    for (let i = 0; i < allTravelsProviders.length; i++) {
        if (allTravelsProviders[i].idTravels.length > 0) {
            let reqBody = { "idTravels": allTravelsProviders[i].idTravels, "options": allTravelsProviders[i].options }
            let linkPayment = (await (axios.post(`${allTravelsProviders[i].provider.routingAddress}/bookings`, reqBody))).data
            allLinkPayment.push(linkPayment)
        }
    }

    return allLinkPayment

};



module.exports = {
    addBooking
};