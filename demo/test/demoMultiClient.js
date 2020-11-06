const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const YELLOW_COLOR = '\x1b[33m'
const GREEN_COLOR = "\x1b[32m"
const MAGENTA_COLOR = "\x1b[35m"
const WHITE_COLOR = "\x1b[37m"
const idBooking = "1";

const dotenv = require('dotenv');

const dotenvConfig = dotenv.config()
if (dotenvConfig.error) {
    throw dotenvConfig.error
}


const rootingService = "http://localhost:4002"
console.log("**************** DEMO *****************")
/*console.log(YELLOW_COLOR ,"When", WHITE_COLOR, "the agent get a travel from Nice to Brest and the departure time is at 9:30 am")

console.log(YELLOW_COLOR ,"Then", WHITE_COLOR,"the agent can create a booking for this travel")

console.log(YELLOW_COLOR ,"And", WHITE_COLOR," the agent can obtain a link to pay for this booking ")*/



describe('demo', () => {
    it('demo', () => {
        console.log(GREEN_COLOR, "L'agence souhaite trouver les informations des trois clients souhaitant réserver avec une personne ayant un", YELLOW_COLOR, "vélo", GREEN_COLOR, "et une personne à", YELLOW_COLOR, "mobilité réduite")

        console.log(MAGENTA_COLOR, "Envoie de trois requêtes a l'API sur la route", YELLOW_COLOR, "/customers")

        axios.get(process.env.CUSTOMER_ADDR + "/customers", { params: { "firstName": "Jhon", "lastName": "Molt" } })
            .then((response) => {
                const resultCustomer = response.data
                console.log(MAGENTA_COLOR, "Le resultat de ces 3 requêtes est :")
                console.log(WHITE_COLOR, resultCustomer)
                console.log()
                axios.get(process.env.CUSTOMER_ADDR + "/customers", { params: { "firstName": "Chris", "lastName": "Molt" } })
                    .then((response) => {
                        const resultCustomer = response.data
                        console.log(WHITE_COLOR, resultCustomer)
                        console.log()

                        axios.get(process.env.CUSTOMER_ADDR + "/customers", { params: { "firstName": "Agatha", "lastName": "Molt" } })
                            .then((response) => {
                                const resultCustomer = response.data
                                console.log(WHITE_COLOR, resultCustomer)
                                console.log()
                            }).then((response) => {

                                console.log(GREEN_COLOR, "L'agence souhaite trouver un train allant de", YELLOW_COLOR, "Nice", GREEN_COLOR, "à", YELLOW_COLOR, "Brest", GREEN_COLOR)
                                console.log(MAGENTA_COLOR, "La requete est un", YELLOW_COLOR, "GET", MAGENTA_COLOR, "contenant en", YELLOW_COLOR, "parametres ", MAGENTA_COLOR, ":")
                                console.log(WHITE_COLOR, { options: ["bicycle"], from: "Nice", to: "Brest", id: ["C1", "C2", "C3"] })
                                axios.get(rootingService + "/travels", { params: { "options": ["bicycle"], "from": "Nice", "to": "Brest", "id": ["C1", "C2", "C3"] } })
                                    .then((response) => {
                                        const result = response.data

                                        console.log(MAGENTA_COLOR, "Le resultat de cette requete est :")
                                        console.log(WHITE_COLOR, result)
                                        console.log()

                                        return [result[1][0], result[1][1]];
                                    })
                                    .then((travel) => {
                                        console.log(GREEN_COLOR, "L'agence decide de reserver le deuxième des trajets qui est celui avec correspondance :", YELLOW_COLOR, "NP2", GREEN_COLOR, "&", YELLOW_COLOR, "PB1")
                                        console.log(MAGENTA_COLOR, "Le logiciel envoie donc trois requete a l'API sur la route", YELLOW_COLOR, "/bookings")
                                        console.log(MAGENTA_COLOR, "Les requete sont des", YELLOW_COLOR, "POST", MAGENTA_COLOR, "contenant en", YELLOW_COLOR, "parametres ", MAGENTA_COLOR, ":")
                                        console.log(WHITE_COLOR, { idTravels: [travel[0].id, travel[1].id], options: ["bicycle"] })
                                        console.log(WHITE_COLOR, { idTravels: [travel[0].id, travel[1].id], options: [""] })
                                        console.log(WHITE_COLOR, { idTravels: [travel[0].id, travel[1].id], options: [""] })

                                        axios.post(rootingService + "/bookings", { idTravels: [travel[0].id, travel[1].id], options: ["bicycle"] })
                                            .then(function (response) {
                                                console.log(MAGENTA_COLOR, "Les liens de paiements sont renvoyés :")
                                                console.log(WHITE_COLOR, response.data)

                                            }).then((response) => {
                                                axios.post(rootingService + "/bookings", { idTravels: [travel[0].id, travel[1].id], options: [] })
                                                    .then(function (response) {
                                                        console.log(WHITE_COLOR, response.data)

                                                    }).then((response) => {
                                                        axios.post(rootingService + "/bookings", { idTravels: [travel[0].id, travel[1].id], options: [] })
                                                            .then(function (response) {
                                                                console.log(WHITE_COLOR, response.data)
                                                                console.log()
                                                                console.log(GREEN_COLOR, "Lorsque le systeme de payement externe a reussi a encaisser le montant il fait alors une requete pour chacun de ces lien")


                                                                axios.post(response.data).then(function (response) {
                                                                    console.log(MAGENTA_COLOR, "Le resultat de cette requete est :")
                                                                    console.log(WHITE_COLOR, response.data)

                                                                    console.log(GREEN_COLOR, "La reservation a donc reussis a être payé")

                                                                })
                                                            })

                                                    });

                                            });


                                    })

                            });
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
                return true
            });
    });

});