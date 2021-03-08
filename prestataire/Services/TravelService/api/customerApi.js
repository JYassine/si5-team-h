const axios = require('axios');

async function getCustomerInfo(customerId) {
    return axios.get(`${process.env.CUSTOMER_ADDR}/customers/${customerId}`)
        .then(response => response.data)
        .catch(err => console.error('Error fetching customer', err));
}

module.exports = {getCustomerInfo};
