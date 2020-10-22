const expect = require('chai').expect;
const axios = require('axios').default;
const travelController = require('../controllers/travels')
const nock = require('nock')

describe("Get all travels",function (){
    const requestTravelsNoOptions = {"options":[]}
    const requestPlug = {"options":["plug"]}
    const requestBicycle = {"options":["bicycle"]}
    const requestFullOptions = {"options":["bicycle","plug"]}
    const expectedResponseTravelsNoOptions = [
        {
            "id": "NP1",
            "from": "Nice",
            "to": "Paris",
            "departureTime": "9h30",
            "arrivingTime": "15h30",
            "price": 29,
            "options": [],
            "taken": false
        },
        {
            "id": "NP2",
            "from": "Nice",
            "to": "Paris",
            "departureTime": "8h30",
            "arrivingTime": "13h00",
            "price": 59,
            "options": [
                "bicycle",
                "plug"
            ],
            "taken": false
        },
        {
            "id": "NB1",
            "from": "Nice",
            "to": "Brest",
            "departureTime": "6h00",
            "arrivingTime": "16h00",
            "price": 89,
            "options": [
                "bicycle",
                "plug"
            ],
            "taken": false
        },
        {
            "id": "NB2",
            "from": "Nice",
            "to": "Brest",
            "departureTime": "6h00",
            "arrivingTime": "16h00",
            "price": 89,
            "options": [
                "bicycle"
            ],
            "taken": false
        },
        {
            "id": "NB3",
            "from": "Nice",
            "to": "Brest",
            "departureTime": "6h00",
            "arrivingTime": "16h00",
            "price": 89,
            "options": [
                "plug"
            ],
            "taken": false
        }
    ]
    const expectedResponseTravelsWithPlug = [
        {
            "id": "NP2",
            "from": "Nice",
            "to": "Paris",
            "departureTime": "8h30",
            "arrivingTime": "13h00",
            "price": 59,
            "options": [
                "bicycle",
                "plug"
            ],
            "taken": false
        },
        {
            "id": "NB1",
            "from": "Nice",
            "to": "Brest",
            "departureTime": "6h00",
            "arrivingTime": "16h00",
            "price": 89,
            "options": [
                "bicycle",
                "plug"
            ],
            "taken": false
        },
        {
            "id": "NB3",
            "from": "Nice",
            "to": "Brest",
            "departureTime": "6h00",
            "arrivingTime": "16h00",
            "price": 89,
            "options": [
                "plug"
            ],
            "taken": false
        }
    ]
    const expectedResponseTravelsWithBicycle = [
        {
            "id": "NP2",
            "from": "Nice",
            "to": "Paris",
            "departureTime": "8h30",
            "arrivingTime": "13h00",
            "price": 59,
            "options": [
                "bicycle",
                "plug"
            ],
            "taken": false
        },
        {
            "id": "NB1",
            "from": "Nice",
            "to": "Brest",
            "departureTime": "6h00",
            "arrivingTime": "16h00",
            "price": 89,
            "options": [
                "bicycle",
                "plug"
            ],
            "taken": false
        },
        {
            "id": "NB2",
            "from": "Nice",
            "to": "Brest",
            "departureTime": "6h00",
            "arrivingTime": "16h00",
            "price": 89,
            "options": [
                "bicycle"
            ],
            "taken": false
        }
    ]
    const expectedResponseTravelsFullOptions = [
        {
            "id": "NP2",
            "from": "Nice",
            "to": "Paris",
            "departureTime": "8h30",
            "arrivingTime": "13h00",
            "price": 59,
            "options": [
                "bicycle",
                "plug"
            ],
            "taken": false
        },
        {
            "id": "NB1",
            "from": "Nice",
            "to": "Brest",
            "departureTime": "6h00",
            "arrivingTime": "16h00",
            "price": 89,
            "options": [
                "bicycle",
                "plug"
            ],
            "taken": false
        }
    ]
    it("should get all the travels with no options (i.e all travels)",function(){getTravels(requestTravelsNoOptions,expectedResponseTravelsNoOptions)})
    it("should get all the travels with plug option",function (){getTravels(requestPlug,expectedResponseTravelsWithPlug)})
    it("should get all the travels with bicycle option",function (){getTravels(requestBicycle,expectedResponseTravelsWithBicycle)})
    it("should get all the travels with full options",function (){getTravels(requestFullOptions,expectedResponseTravelsFullOptions)})

    function getTravels(request,expectedResponse){
        travelController.getTravels(request).then((response)=>{
            nock('http://localhost:4001')
                .post('/travels', request)
                .reply(201, response)
        }).then(()=>{
            axios.post("http://localhost:4001/travels",request)
                .then(response =>{
                    expect(response.data).to.not.equal(undefined)
                    expect(response.data).to.eql(expectedResponse)
                })
        })
    }
})