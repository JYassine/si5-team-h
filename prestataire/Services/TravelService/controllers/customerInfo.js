function isCustomerPMR(customer) {
    return customer.infos === "PMR";
}

function parseCustomersId(request) {
    if (typeof(request) === 'string') {
        const result = [];
        result.push(request);
        return result;
    }
    return request;
}

module.exports = {isCustomerPMR, parseCustomersId};
