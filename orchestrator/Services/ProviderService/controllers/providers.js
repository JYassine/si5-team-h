const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('./db.json')
const db = low(adapter)


db.defaults({ providers: [] })
    .write()


if (db.has('providers').value()) { //Reset de la BD avec la liste des trains de départ
    db.get('providers').remove({}).write()
    if (process.env.DEV_MODE == 1){
        db.get('providers')
        .push(
            {
                "id": "LCLSNCF",
                "name": "sncf",
                "routingAddress": "http://localhost:4002"
            },
            {
                "id": "LCLTLMCF",
                "name": "tlmcf",
                "routingAddress": "http://localhost:4022"
            },
        )
        .write()
    } else {
        db.get('providers')
        .push(
            {
                "id": "DCKSNCF",
                "name": "sncf",
                "routingAddress": "http://rooting:4002"
            },
            {
                "id": "DCKTLMCF",
                "name": "tlmcf",
                "routingAddress": "http://rooting:4022"
            },
        )
        .write()
    }
}

async function getProviders() {
    try {
        return db.get("providers").value()
    } catch (err) {
        next(err)
    }
}


async function providerById(idProvider) {
    try {
        db.read()
        return db.get('providers')
            .find(element => element.id == idProvider).value()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getProviders,
    getProviderById: providerById
};