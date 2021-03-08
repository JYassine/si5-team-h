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


const rootingService = "http://localhost:4014"
console.log("**************** DEMO *****************")


const demo = async () =>{
    
    
    console.log(GREEN_COLOR, "L'agence souhaite trouver un train allant de", YELLOW_COLOR, "Nice", GREEN_COLOR, "à", YELLOW_COLOR, "Brest", GREEN_COLOR)

    console.log(GREEN_COLOR, "L'agence decide de reserver le deuxième des trajets qui est celui avec correspondance :", YELLOW_COLOR, "NP2", GREEN_COLOR, "&", YELLOW_COLOR, "NP1")
    console.log(MAGENTA_COLOR, "Le logiciel envoie une requête a l'API sur la route", YELLOW_COLOR, "/bookings")
    console.log(MAGENTA_COLOR, "La requête", YELLOW_COLOR, "POST", MAGENTA_COLOR, "contient en", YELLOW_COLOR, "parametres ", MAGENTA_COLOR, ":")
    console.log(WHITE_COLOR, { idTravels: ["1-NP2", "2-NP1"], options: ["plug","bicycle"] })
    const linkPayment1 = await axios.post(rootingService + "/bookings", { idTravels: ["1-NP2", "2-NP1"], options: ["plug","bicycle"] })
    
    
    console.log(GREEN_COLOR, "Traitement de la demande de booking...")

    /*console.log(MAGENTA_COLOR, "Les liens de paiements sont renvoyés :")
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
    console.log(GREEN_COLOR, "La reservation a donc reussis a être payé")*/

}

       
demo()