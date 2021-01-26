const axios = require('axios');

async function getCustomers() {
    try {
        var customers = [];
        customers = customers.concat((await axios.get(process.env.ROOTING1_ADDR + `/customers`)).data);
        customers = customers.concat((await axios.get(process.env.ROOTING2_ADDR + `/customers`)).data);

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