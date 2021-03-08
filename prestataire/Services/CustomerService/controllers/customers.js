const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('./db.json')
const db = low(adapter)


db.defaults({ customers: [] })
    .write()


if (db.has('customers').value()) { //Reset de la BD avec la liste des trains de départ
    db.get('customers').remove({}).write()
    db.get('customers')
        .push(
            {
                "id": "C1",
                "firstName": "Jhon",
                "lastName": "Molt",
                "mail": "jhon.molt@gmail.com",
                "age": 25,
                "gender": 'M',
                "info": "ZOU"
            },
            {
                "id": "C2",
                "firstName": "Agatha",
                "lastName": "Molt",
                "mail": "agatha.molt@gmail.com",
                "age": 40,
                "gender": 'F',
                "infos": ""
            },
            {
                "id": "C3",
                "firstName": "Chris",
                "lastName": "Molt",
                "mail": "chris.molt@gmail.com",
                "age": 65,
                "gender": 'M',
                "infos": "PMR"
            },

        )
        .write()
}


async function getCustomers() {
    try {
        return db.get("customers").value()
    } catch (err) {
        next(err)
    }

}

async function customerById(idCustomer) {
    try {
        db.read()
        return db.get('customers')
            .find(element => element.id == idCustomer).value()
    } catch (err) {
        next(err)
    }
}

async function customerByLastNameAndFirstName(firstName, lastName){
    try {
        db.read()
        return db.get('customers')
            .find(element => element.firstName === firstName && element.lastName === lastName).value()
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getCustomers,
    getCustomerById: customerById,
    customerByLastNameAndFirstName
};