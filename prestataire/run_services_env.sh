#!/bin/bash

## Run ./run_services_env.sh sncf dev to start all services in local sncf environment 

## Run ./run_services_env.sh sncf prod to start all services in production sncf environment

kill=0
db=0
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

    ## Lancer en environnement de dev
if [[ $1 = "sncf" && $2 = "dev" ]] || [[ $1 = "plmcf" && $2 = "dev" ]]
then
    echo "Installation of pm2"
    #npm install -g pm2
    services_list=$(ls Services/)
    mapfile -t services_array <<< "$services_list"

    cd Services

    for i in "${services_array[@]}"
        do
            echo "-----------------------"
            echo $i
            cd $i
            rm .env
            cp ../../$1_dev.env ./.env
            #npm install
            #npm test
            pm2 start server.js -n $1_$i
            cd ../
        done

    echo "All services launch successfully"
fi


## Lancer en environnement de prod
if [[ $1 = "sncf" && $2 = "prod" ]] || [[ $2 = "sncf" && $1 = "prod" ]] || [[ $1 = "plmcf" && $2 = "prod" ]] || [[ $2 = "plmcf" && $1 = "prod" ]]
then

    services_list=$(ls Services/)
    mapfile -t services_array <<< "$services_list"

    cd Services

    for i in "${services_array[@]}"
        do
            echo "-----------------------"
            echo $i
            cd $i
            rm .env
            cp ../../$1.env ./.env
            cd ../
        done
        
    cd $parent_path
    cd $1_network
    docker-compose build
    docker-compose up

fi
