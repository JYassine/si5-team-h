const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('data/db.json')
const db = low(adapter)





const deleteTravel = async (body) => {
    const hasTravel = await hasTheTravel(body.idTravel)
    if (!hasTravel){
        return 204
    }else {
        db.get('travels')
            .find({id: body.idTravel})
            .assign({taken: true})
            .write()

        return 200
    }
};

const hasTheTravel = async (idTravel) =>{
    const travel = db.get('travels')
                    .find({id :idTravel})
                    .value()
    return travel !== undefined
}

module.exports = {
    deleteTravel
};