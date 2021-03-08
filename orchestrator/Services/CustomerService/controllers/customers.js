const axios = require('axios');
const { getProviders } = require('../api/providers');

async function getCustomers() {
    try {
        var customers = [];
        var response = [];

        for (provider of (await getProviders())){
            response = [];

            try {
                response = await axios.get(provider.routingAddress + "/customers")

                customers = customers.concat(response.data)
            } catch (error) {
                console.log("the server " + provider.id + " dont response")
            }
        }

        return customers;
    } catch (err) {
        next(err)
    }

}


async function customerById(idCustomer) {
    try {
        var customers = [];
        var response = [];

        for (provider of (await getProviders())){
            response = [];

            try {
                response = await axios.get(provider.routingAddress + "/customers/"+idCustomer)

                customers = customers.concat(response.data)
            } catch (error) {
                console.log("the server " + provider.id + " dont response")
            }
        }

        return customers;
    } catch (err) {
        next(err)
    }
}

async function customerByLastNameAndFirstName(firstName, lastName){
    try {
        var customers = [];
        var response = [];

        for (provider of (await getProviders())){
            response = [];

            try {
                response = await axios.get(provider.routingAddress + "/customers?firstName="+firstName+"&lastName="+lastName)

                customers = customers.concat(response.data)
            } catch (error) {
                console.log("the server " + provider.id + " dont response :"+ error)
            }
        }

        return customers;
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getCustomers,
    getCustomerById: customerById,
    customerByLastNameAndFirstName
};