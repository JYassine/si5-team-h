const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios');
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


const rootingService = "http://localhost:4012"
console.log("**************** DEMO *****************")


const demo = async () =>{
    console.log(GREEN_COLOR, "L'agence souhaite trouver les informations des trois clients souhaitant réserver avec une personne ayant un", YELLOW_COLOR, "vélo", GREEN_COLOR, "et une personne à", YELLOW_COLOR, "mobilité réduite")

    console.log(MAGENTA_COLOR, "Envoie de trois requêtes a l'API sur la route", YELLOW_COLOR, "/customers")
    const c1 = await axios.get(rootingService + "/customers", { params: { "firstName": "Jhon", "lastName": "Molt" }})
    const c2 = await axios.get(rootingService + "/customers", {  params: { "firstName": "Chris", "lastName": "Molt"  }}) 
    const c3 = await axios.get(rootingService + "/customers", { params: { "firstName": "Agatha", "lastName": "Molt"  }}) 

    
    console.log(MAGENTA_COLOR, "L'agence obtient le resultat des 3 requêtes :")
    console.log(WHITE_COLOR, c1.data)
    console.log(WHITE_COLOR, c2.data)
    console.log(WHITE_COLOR, c3.data)
    console.log(GREEN_COLOR, "L'agence souhaite trouver un train allant de", YELLOW_COLOR, "Nice", GREEN_COLOR, "à", YELLOW_COLOR, "Brest", GREEN_COLOR)
    console.log(MAGENTA_COLOR, "La requete est un", YELLOW_COLOR, "GET", MAGENTA_COLOR, "contenant en", YELLOW_COLOR, "parametres ", MAGENTA_COLOR, ":")
    console.log(WHITE_COLOR, { options: ["bicycle"], from: "Nice", to: "Brest", id: ["C1", "C2", "C3"] })

    const travels = (await axios.get(rootingService + "/travels", { params: { "options": ["bicycle"], "from": "Nice", "to": "Brest", "id": ["C1", "C2", "C3"] }})).data
    console.log(MAGENTA_COLOR, "Le resultat de cette requete est :")
    const travelsReservation = [travels[4][0], travels[0][1]]
    console.log(WHITE_COLOR,travelsReservation)
    console.log(GREEN_COLOR, "L'agence decide de reserver le deuxième des trajets qui est celui avec correspondance :", YELLOW_COLOR, "NP2", GREEN_COLOR, "&", YELLOW_COLOR, "PB1")
    console.log(MAGENTA_COLOR, "Le logiciel envoie donc trois requete a l'API sur la route", YELLOW_COLOR, "/bookings")
    console.log(MAGENTA_COLOR, "Les requete sont des", YELLOW_COLOR, "POST", MAGENTA_COLOR, "contenant en", YELLOW_COLOR, "parametres ", MAGENTA_COLOR, ":")
    console.log(WHITE_COLOR, { idTravels: [travelsReservation[0].id, travelsReservation[1].id], options: ["bicycle"] })
    console.log(WHITE_COLOR, { idTravels: [travelsReservation[0].id, travelsReservation[1].id], options: ["bicycle"] })
    console.log(WHITE_COLOR, { idTravels: [travelsReservation[0].id, travelsReservation[1].id], options: ["bicycle"] })
    const linkPayment1 = await axios.post(rootingService + "/bookings", { idTravels: [travelsReservation[0].id, travelsReservation[1].id], options: ["bicycle"] })
    
    const linkPayment2 = await axios.post(rootingService + "/bookings", { idTravels: [travelsReservation[0].id, travelsReservation[1].id], options: ["bicycle"] })
    
    const linkPayment3 = await axios.post(rootingService + "/bookings", { idTravels: [travelsReservation[0].id, travelsReservation[1].id], options: ["bicycle"] })
    

    console.log(MAGENTA_COLOR, "Les liens de paiements sont renvoyés :")
    console.log(WHITE_COLOR, linkPayment1.data)
    console.log(WHITE_COLOR, linkPayment2.data)
    console.log(WHITE_COLOR, linkPayment3.data)
    console.log(GREEN_COLOR, "Lorsque le systeme de payement externe a reussi a encaisser le montant il fait alors une requete pour chacun de ces lien")

    console.log(MAGENTA_COLOR, "Le resultat de ces requete est :")
    
    console.log(WHITE_COLOR, (await axios.post(linkPayment1.data[0])).data)
    console.log(WHITE_COLOR, (await axios.post(linkPayment1.data[1])).data)
    
    console.log(WHITE_COLOR, (await axios.post(linkPayment2.data[0])).data)
    console.log(WHITE_COLOR, (await axios.post(linkPayment2.data[1])).data)

    console.log(WHITE_COLOR, (await axios.post(linkPayment3.data[0])).data)
    console.log(WHITE_COLOR, (await axios.post(linkPayment3.data[1])).data)
    console.log(GREEN_COLOR, "La reservation a donc reussis a être payé")

}

       
demo()