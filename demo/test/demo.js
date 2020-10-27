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
        axios.get(rootingService + "/travels", {params :{"options":[], "from":"Nice", "to":"Paris"}})
            .then( (response) => {
                const result = response.data
                expect(result.length).to.equal(2)
                expect(result[0].from).to.equal("Nice")
                expect(result[0].to).to.equal("Paris")

                console.log(YELLOW_COLOR, "Rooting service > Travel Service : Get the travel")
                console.log(GREEN_COLOR, "RESPONSE :", GREEN_COLOR, JSON.stringify(result[0]))
                travelId = result[0].id
                return result[0];
            })
            .then((travel) => {
                axios.post(rootingService + "/bookings", { id: idBooking, idTravel: travel.id })
                    .then(function (response) {
                        expect(response.status).to.equal(201)
                        console.log(YELLOW_COLOR, "Rooting service > BookingService : Create the travel")
                        console.log(MAGENTA_COLOR, "Asynchron request to check if travel ID exist -> BookingService > TravelService")
                        console.log(GREEN_COLOR, "RESPONSE :", GREEN_COLOR, response.status)
                        return travel
                    }).then( (travel) => {
                        axios.post(rootingService + "/payment", {
                            payment_method: "Paypal",
                            idBooking: idBooking,
                            currency: "USD",
                            total: (travel.price).toString()
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
