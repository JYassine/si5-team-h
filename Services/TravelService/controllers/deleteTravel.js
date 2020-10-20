const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('data/db.json')
const db = low(adapter)





const deleteTravel = async (body) => {
    db.get('travels')
        .find({id :body.idTravel})
        .assign({taken:true})
        .write()


    return "The travel "+body.id + " is no longer available."
};

module.exports = {
    deleteTravel
};