const expect = require('chai').expect;
const axios = require('axios');
require('dotenv').config()
const customerController = require('../controllers/customers')
const MockAdapter = require("axios-mock-adapter");


const id = "C1"
const expectedResponse =
{
    "id": "C1",
    "firstName": "Jhon",
    "lastName": "Molt",
    "mail": "jhon.molt@gmail.com",
    "age": 25,
    "gender": "M",
    "info": "ZOU"
}

describe("Get customer with id C1", function () {
    beforeEach(() => {
        var mock = new MockAdapter(axios);
        mock.onGet(`${process.env.CUSTOMER_ADDR}/customers/` + id).reply(200, expectedResponse);


    })

    it("should get the customer with id C1", async function () {
        const customer = await customerController.getCustomerById(id);
        axios.get(`${process.env.CUSTOMER_ADDR}/customers/` + id)
            .then(response => {
                expect(response.data).to.not.equal(undefined)
                expect(response.data).to.eql(customer)
                expect(response.data.id).to.eql(customer.id)
            })

    });

})


describe("Get customer with first name Jhon and last name Molt", function () {
    beforeEach(() => {
        var mock = new MockAdapter(axios);
        mock.onGet(`${process.env.CUSTOMER_ADDR}/customers/?firstName=Jhon&lastName=Molt`).reply(200, expectedResponse);


    })

    it("should get the customer Jhon Molt", async function () {
        
        let firstName="Jhon"
        let lastName ="Molt"
        const customerJhon = await customerController.customerByLastNameAndFirstName(firstName, lastName);

        axios.get(`${process.env.CUSTOMER_ADDR}/customers/?firstName=`+firstName+`&lastName=`+lastName)
            .then(response => {
                expect(response.data).to.not.equal(undefined)
                expect(response.data).to.eql(customerJhon)
                expect(response.data.firstName).to.eql(customerJhon.firstName)
                expect(response.data.lastName).to.eql(customerJhon.lastName)
            })

    });

})