const axios = require('axios');

async function getCustomers() {
    try {
        return (await axios.get(process.env.CUSTOMER_ADDR + `/customers`)).data
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