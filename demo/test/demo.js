const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const YELLOW_COLOR = '\x1b[33m%s\x1b[0m'
const GREEN_COLOR = "\x1b[32m"
const MAGENTA_COLOR = "\x1b[35m"
const WHITE_COLOR = "\x1b[37m"
const idBooking = "1";

const rootingService = "http://localhost:4002"
console.log("**************** DEMO *****************")
console.log(YELLOW_COLOR ,"When", WHITE_COLOR, "the agent get a travel from Nice to Paris and the departure time is at 9:30 am")

console.log(YELLOW_COLOR ,"Then", WHITE_COLOR,"the agent can create a booking for this travel")

console.log(YELLOW_COLOR ,"And", WHITE_COLOR," the agent can obtain a link to pay for this booking ")



describe('demo', () => {
    it('demo', () => {
        axios.get(rootingService + "/travels", {params :{"options":[], "from":"Nice", "to":"Brest"}})
            .then( (response) => {
                const result = response.data
                expect(result.length).to.equal(4)

                expect(result[3][0].from).to.equal("Nice")
                expect(result[3][0].to).to.equal("Paris")

                expect(result[3][1].from).to.equal("Paris")
                expect(result[3][1].to).to.equal("Brest")

                console.log(YELLOW_COLOR, "Rooting service > Travel Service : Get the travel")
                console.log(GREEN_COLOR, "RESPONSE :", GREEN_COLOR, JSON.stringify(result[0]))
                return [result[3][0],result[3][1]];
            })
            .then((travel) => {
                axios.post(rootingService + "/bookings", { id: idBooking, idsTravel: [travel[0].id, travel[1].id]})
                    .then(function (response) {
                        expect(response.status).to.equal(201)
                        console.log(YELLOW_COLOR, "Rooting service > BookingService : Create the travel")
                        console.log(MAGENTA_COLOR, "Asynchron request to check if travel ID exist -> BookingService > TravelService")
                        console.log(GREEN_COLOR, "RESPONSE :", GREEN_COLOR, response.status)
                        return travel
                    }).then( (travel) => {
                        var price = 0
                        for (var i = 0; i < travel.length; i++){
                            price += travel[i].price;
                        }

                        expect(price).to.equal(78)

                        axios.post(rootingService + "/payment", {
                            payment_method: "Paypal",
                            idBooking: idBooking,
                            currency: "USD",
                            total: price.toString()
                        }).then(function (response) {
        
                            expect(response.status).to.equal(201)
                            console.log(YELLOW_COLOR, "Rooting service > PaymentService : Create an order of payment ")
                            console.log(MAGENTA_COLOR, "Asynchron request to check if booking ID exist -> PaymentService > BookingService")
                            console.log(GREEN_COLOR, "RESPONSE :", GREEN_COLOR, JSON.stringify(response.data))
                        })
                    })
                return travel
            });
    });
});
