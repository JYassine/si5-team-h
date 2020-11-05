const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const YELLOW_COLOR = '\x1b[33m'
const GREEN_COLOR = "\x1b[32m"
const MAGENTA_COLOR = "\x1b[35m"
const WHITE_COLOR = "\x1b[37m"
const idBooking = "1";

const rootingService = "http://localhost:4002"
console.log("**************** DEMO *****************")
/*console.log(YELLOW_COLOR ,"When", WHITE_COLOR, "the agent get a travel from Nice to Brest and the departure time is at 9:30 am")

console.log(YELLOW_COLOR ,"Then", WHITE_COLOR,"the agent can create a booking for this travel")

console.log(YELLOW_COLOR ,"And", WHITE_COLOR," the agent can obtain a link to pay for this booking ")*/



describe('demo', () => {
    it('demo', () => {
        console.log(GREEN_COLOR, "L'agence souhaite trouver un train allant de", YELLOW_COLOR, "Nice", GREEN_COLOR, "à", YELLOW_COLOR, "Brest")
        console.log(MAGENTA_COLOR, "Le logiciel commence par envoyer une requete a l'API sur la route", YELLOW_COLOR, "/travels")
        console.log(MAGENTA_COLOR, "La requete est un", YELLOW_COLOR, "GET", MAGENTA_COLOR, "contenant en", YELLOW_COLOR, "parametres ", MAGENTA_COLOR, ":")
        console.log(WHITE_COLOR, {options:[], from:"Nice", to:"Brest"})
        axios.get(rootingService + "/travels", {params :{"options":[], "from":"Nice", "to":"Brest"}})
            .then( (response) => {
                const result = response.data

                console.log(MAGENTA_COLOR, "Le resultat de cette requete est :")
                console.log(WHITE_COLOR, result)
                console.log()

                return [result[3][0],result[3][1]];
            })
            .then((travel) => {
                console.log(GREEN_COLOR, "L'agence decide de reserver le quatrième des trajets qui est celui avec correspondance :", YELLOW_COLOR, "NP2", GREEN_COLOR, "&", YELLOW_COLOR, "PB1")
                console.log(MAGENTA_COLOR, "Le logiciel envoie donc une requete a l'API sur la route", YELLOW_COLOR, "/bookings")
                console.log(MAGENTA_COLOR, "La requete est un", YELLOW_COLOR, "POST", MAGENTA_COLOR, "contenant en", YELLOW_COLOR, "parametres ", MAGENTA_COLOR, ":")
                console.log(WHITE_COLOR, { idTravels: [travel[0].id, travel[1].id], options: []})

                axios.post(rootingService + "/bookings", { idTravels: [travel[0].id, travel[1].id], options: []})
                    .then(function (response) {
                        console.log(MAGENTA_COLOR, "Le resultat de cette requete est :")
                        console.log(WHITE_COLOR, response.data)
                        console.log()
                    })
                    
                    /*.then( (travel) => {
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
                    })*/
                return travel
            });
    });
});
