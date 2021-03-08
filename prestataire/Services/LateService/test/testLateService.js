const expect = require('chai').expect;
const axios = require('axios').default;
const MockAdapter = require("axios-mock-adapter");
const lateServiceController = require('../controllers/lateService')

/**
 * In this test, the booking DB is mock: there's 2 booking for the travel NP2 from 2 differents agencies and 1 booking for NP1
 */

const mockAgenciesNP1 = [
    {
        "id": "B2",
        "idAgency": "agency1f54rz3dekkgy2lh2a",
        "idsTravel": [
            "NP1"
        ],
        "options": [],
        "price": {
            "id": "NP1-xf67fockh2nx3qb",
            "idTravel": "NP1",
            "totalPrice": 100
        }
    }
]

const mockAgenciesNP2 = [
    {
        "id": "B4",
        "idAgency": "agencyxf679ekkh2o7gox",
        "idsTravel": [
            "NP2"
        ],
        "options": [],
        "price": {
            "id": "NP2-xf67fockh2o7ztl",
            "idTravel": "NP2",
            "totalPrice": 120
        }
    },
    {
        "id": "B5",
        "idAgency": "agency1f54rz3dekkgy2lh2a",
        "idsTravel": [
            "NP2"
        ],
        "options": [],
        "price": {
            "id": "NP2-xf67fockh2olr0z",
            "idTravel": "NP2",
            "totalPrice": 83
        }
    }
]

describe("Send email",function (){
    beforeEach(()=>{
        const mock = new MockAdapter(axios);
        mock.onPost(`${process.env.ACCOUNT_ADDR}/account`,{"id":"agency1f54rz3dekkgy2lh2a"}).reply(200, {"agencyName": "TravelBrest", "mail": "test123@gmail.com"});
        mock.onPost(`${process.env.ACCOUNT_ADDR}/account`,{"id":"agencyxf679ekkh2o7gox"}).reply(200,{"agencyName": "TravelNice", "mail": "blabla@gmail.com"});
        mock.onGet(`${process.env.BOOKING_ADDR}/bookings/getAllAgencies/NP1`).reply(200,mockAgenciesNP1);
        mock.onGet(`${process.env.BOOKING_ADDR}/bookings/getAllAgencies/NP2`).reply(200,mockAgenciesNP2);
        
    })
    const requestNP1 = {"idsTravels":["NP1"]}
    const requestNP2 = {"idsTravels":["NP2"]}
    const requestNP1NP2 = {"idsTravels":["NP1","NP2"]}

    const expectedResponseNP1 = [
        {
            "idTravel": "NP1",
            "agencies": [
                {
                    "agencyName": "TravelBrest",
                    "mail": "test123@gmail.com"
                }
            ]
        }
    ]

    const expectedResponseNP2 = [
        {
            "idTravel": "NP2",
            "agencies": [
                {
                    "agencyName": "TravelNice",
                    "mail": "blabla@gmail.com"
                },
                {
                    "agencyName": "TravelBrest",
                    "mail": "test123@gmail.com"
                }
            ]
        }
    ]

    const expectedResponseNP1NP2 = [
        {
            "idTravel": "NP1",
            "agencies": [
                {
                    "agencyName": "TravelBrest",
                    "mail": "test123@gmail.com"
                }
            ]
        },
        {
            "idTravel": "NP2",
            "agencies": [
                {
                    "agencyName": "TravelNice",
                    "mail": "blabla@gmail.com"
                },
                {
                    "agencyName": "TravelBrest",
                    "mail": "test123@gmail.com"
                }
            ]
        }
    ]

    it('should get all agencies that had a booking with the NP1 travel', function () {
        testNotify(requestNP1,expectedResponseNP1)
    });
    it('should get all agencies that had a booking with the NP2 travel', function () {
        testNotify(requestNP2,expectedResponseNP2)
    });
    it('should get all agencies that had a booking with the NP1 and NP2 travels', function () {
        testNotify(requestNP1NP2,expectedResponseNP1NP2)
    });


    async function testNotify(request, expectedResponse) {
        lateServiceController.notifyAgencies(request).then(result =>{
            expect(result).to.eql(expectedResponse)
        })
    }
})