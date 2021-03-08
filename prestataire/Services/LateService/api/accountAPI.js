const axios = require('axios').default;

const getAccountInfo = async (id) => {
    return await axios.post(`${process.env.ACCOUNT_ADDR}/account`, { id: id })

};

module.exports = {
    getAccountInfo
};