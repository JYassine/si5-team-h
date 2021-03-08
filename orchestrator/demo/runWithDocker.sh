#!/bin/bash

kill=0
db=0

for param in "$@"
do
    #Si on souhaite kill les serveur a la fin
    if [ $param = "-k" ]
    then
        kill=1
    fi

    #Si on souhaite vider les db a la fin
    if [ $param = "-db" ]
    then
        db=1
    fi
done

services_list=$(ls ../Services/)
mapfile -t services_array <<< "$services_list"

cd ../demo
cp ../production.env ./.env

cd ../Services

for i in "${services_array[@]}"
do
    echo $i
    cd $i
    rm .env
    cp ../../production.env ./.env
    cd ../
    
done

docker-compose build
docker-compose up &

sleep 10
echo "All services launch successfully"

cd ../demo
npm install
npm test

if [ $kill = 1 ]
then
    echo "Kill des serveurs"
    docker-compose down
fi

if [ $db = 0 ]
then
    echo "Vidage des bases de donnees"
    
    cd ../Services

    for i in "${services_array[@]}"
    do
        cd $i
        rm -f db.json
        cd ../
    done
fi