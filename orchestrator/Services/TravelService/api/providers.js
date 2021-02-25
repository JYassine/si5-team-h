const axios = require('axios').default;


const getProviders = async () => {
    return (await axios.get(`${process.env.PROVIDER_ADDR}/providers`)).data;
};

const getProvidersWithId = async (id) => {
    return (await axios.get(`${process.env.PROVIDER_ADDR}/providers/${id}`)).data;
};

module.exports = {
    getProviders,
    getProvidersWithId
};