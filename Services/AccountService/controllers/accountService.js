const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('db.json')
const travelApi = require("../api/travelApi")
const db = low(adapter)
const uniqId = require('uniqid');

db.defaults({ accounts: [] })
    .write()

const inscription = async (body) =>{
    const newAccount = {
        id: uniqId("agency"),
        login: body.login,
        password: body.password,
        agencyName: body.agencyName,
        mail: body.mail
    }
    db.get("accounts").push(newAccount).write();
};

const connection = async (credentials) =>{
    const login = credentials.login
    const password = credentials.password
    const account = db.get("accounts")
        .filter({login: login})
        .value()
    if (!account[0].isUndefined && account[0].password === password){
        return account[0].id
    }else throw Error("Login/Password incorrect")
};

const getInfos = async (id) =>{
    const account = db.get("accounts")
        .filter({id: id.id})
        .value()
        [0]
    return {
        "agencyName":account.agencyName,
        "mail":account.mail
    }

};




module.exports = {
    inscription,
    connection,
    getInfos
};