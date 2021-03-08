const providersApi = require('../api/providers');
const axios = require('axios').default;

function addProviderParamToTrain(train, provider){
    train.id = provider.id + ":" + train.id
    train.providerName = provider.name
}

async function getTravels(request) {
    try {
        var providers = (await providersApi.getProviders());

        var result = []

        for (provider of providers){
            var travelWithOnlyOneComp = (await axios.get(`${provider.routingAddress}/travels?options=${request.options}&id=${request.id}&from=${request.from}&to=${request.to}`)).data;

            for (travel of travelWithOnlyOneComp){
                for (train of travel){
                    addProviderParamToTrain(train, provider)
                }
            }

            result = result.concat(travelWithOnlyOneComp)
        }


        var trainsWithGoodFrom = []
        var trainsWithGoodTo = []
        

        for (provider of providers){
            trainsWithGoodFromTmp = (await axios.get(`${provider.routingAddress}/travels?options=${request.options}&id=${request.id}&from=${request.from}`)).data
            trainsWithGoodToTmp = (await axios.get(`${provider.routingAddress}/travels?options=${request.options}&id=${request.id}&to=${request.to}`)).data


            for (train of trainsWithGoodFromTmp){
                addProviderParamToTrain(train, provider)
            }


            for (train of trainsWithGoodToTmp){
                addProviderParamToTrain(train, provider)
            }

            for (train1 of trainsWithGoodFromTmp){
                for (train2 of trainsWithGoodTo){
                    if (train1.to == train2.from && train1.arrivingTime < train2.departureTime){
                        result.push([train1, train2])
                    }
                }
            }


            for (train2 of trainsWithGoodToTmp){
                for (train1 of trainsWithGoodFrom){
                    if (train1.to == train2.from && train1.arrivingTime < train2.departureTime){
                        result.push([train1, train2])
                    }
                }
            }

            trainsWithGoodFrom = trainsWithGoodFrom.concat(trainsWithGoodFromTmp)
            trainsWithGoodTo = trainsWithGoodTo.concat(trainsWithGoodToTmp)
        }

        

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
