const axios = require('axios');
const { getProviders } = require('../api/providers');

async function getCustomers() {
    try {
        var customers = [];
        for (provider of (await getProviders())){
            customers = customers.concat((await axios.get(provider.routingAddress + "/customers")).data)
        }

        return customers;
    } catch (err) {
        next(err)
    }

}


async function customerById(idCustomer) {
    /*try {
        db.read()
        return db.get('customers')
            .find(element => element.id == idCustomer).value()
    } catch (err) {
        next(err)
    }*/
}

async function customerByLastNameAndFirstName(firstName, lastName){
    /*try {
        db.read()
        return db.get('customers')
            .find(element => element.firstName === firstName && element.lastName === lastName).value()
    } catch (err) {
        next(err)
    }*/
}


module.exports = {
    getCustomers,
    getCustomerById: customerById,
    customerByLastNameAndFirstName
};