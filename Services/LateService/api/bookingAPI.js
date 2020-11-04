const axios = require('axios').default;
const accountAPI = require("../api/accountAPI")

const getAgencies = async (id) => {
    let agencies = []
    const bookings =  await axios.get(`${process.env.BOOKING_ADDR}/bookings/getAllAgencies/` + id);
    for (const booking of bookings.data) {
        const idAgency = booking.idAgency
        const agencyInfos = await accountAPI.getAccountInfo(idAgency)

        agencies.push(agencyInfos.data)
    }
    return agencies
};

module.exports = {
    getAgencies
};