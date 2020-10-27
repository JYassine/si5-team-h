const expect = require('chai').expect;
const axios = require('axios').default;
const travelController = require('../controllers/travels')
const nock = require('nock')

describe("Get travels NP",function (){
    const requestTravelsNoOptions = {"options":[], "from":"Nice", "to":"Paris"}
    const requestPlug = {"options":["plug"], "from":"Nice", "to":"Paris"}
    const requestBicycle = {"options":["bicycle"], "from":"Nice", "to":"Paris"}
    const requestFullOptions = {"options":["bicycle","plug"], "from":"Nice", "to":"Paris"}
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