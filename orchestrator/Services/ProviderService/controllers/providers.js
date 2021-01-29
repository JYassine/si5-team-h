const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('./db.json')
const db = low(adapter)


db.defaults({ providers: [] })
    .write()


if (db.has('providers').value()) { //Reset de la BD avec la liste des trains de départ
    db.get('providers').remove({}).write()
    db.get('providers')
        .push(
            {
                "id": "sncf",
                "name": "sncf",
                "routingAddress": "http://localhost:4002"
            },
            {
                "id": "tlmcf",
                "name": "tlmcf",
                "routingAddress": "http://localhost:4022"
            },
        )
        .write()
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