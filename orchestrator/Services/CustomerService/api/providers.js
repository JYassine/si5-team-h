const axios = require('axios').default;


const getProviders = async () => {
    return (await axios.get(`${process.env.PROVIDER_ADDR}/providers`)).data;

};

module.exports = {
    getProviders
};