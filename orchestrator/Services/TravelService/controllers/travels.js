const providersApi = require('../api/providers');
const axios = require('axios').default;

async function getTravels(request) {
    try {
        var providers = (await providersApi.getProviders());

        var result = []

        for (provider of providers){
            var travelWithOnlyOneComp = (await axios.get(`${provider.routingAddress}/travels?options=${request.options}&id=${request.id}&from=${request.from}&to=${request.to}`)).data;

            for (travel of travelWithOnlyOneComp){
                for (train of travel){
                    train.id = provider.id + ":" + train.id
                    train.providerName = provider.name
                }
            }

            result = result.concat(travelWithOnlyOneComp)
        }


        /*var trainsWithGoodFrom = db.get('trains')
            .filter({taken: false})
            .filter(function (train) {
                if (pmr === true) {
                    return train.pmr === true
                } else {
                    return true;
                }
            })
            .filter(function (travel) {
                let allOptionsGood = true
                for (const option in options) {
                    allOptionsGood = travel.options.includes(options[option]) && allOptionsGood
                }
                return allOptionsGood
            })
            .filter({from: from})
            .filter(function (train) {
                return to != train.to
            })
            .value();


        for (var i = 0; i < trainsWithGoodFrom.length; i++) {
            db.get('trains')
                .filter({taken: false})
                .filter(function (travel) {
                    let allOptionsGood = true
                    for (const option in options) {
                        allOptionsGood = travel.options.includes(options[option]) && allOptionsGood
                    }
                    return allOptionsGood
                })
                .filter({to: to})
                .filter(function (train) {//Filtre pour que les train ai une correspondance au même endroit
                    return trainsWithGoodFrom[i].to == train.from;
                })
                .filter(function (train) {//Filtre pour que la correspondance soit en raccord avec le temps
                    return trainsWithGoodFrom[i].arrivingTime < train.departureTime;
                })
                .value()
                .forEach(element => {
                    result.push([trainsWithGoodFrom[i], element])
                });
        }*/


        return result;


    } catch (err) {
        console.error(err)
    }
}

async function travelById(travelId) {
    providerId = travelId.split(':')[0]
    travelName = travelId.split(':')[1]

    provider = (await providersApi.getProvidersWithId(providerId));

    travel = (await axios.get(`${provider.routingAddress}/travels/${travelName}`)).data

    travel.id = travelId;
    travel.providerName = provider.name
    
    return travel;
}


module.exports = {
    getTravels,
    getTravelById: travelById
};
