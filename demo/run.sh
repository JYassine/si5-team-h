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

echo "Installation of pm2"
npm install -g pm2
services_list=$(ls ../Services/)
mapfile -t services_array <<< "$services_list"

cd ../Services

for i in "${services_array[@]}"
do
    echo "-----------------------"
    echo $i
    cd $i
    rm .env
    cp ../../.env.dev ./.env
    npm install
    npm test
    pm2 start server.js -n $i
    cd ../
done

echo "All services launch successfully"

cd ../demo
npm install
npm test

if [ $kill = 1 ]
then
    echo "Kill des serveurs"
    pm2 kill
fi

if [ $db = 0 ]
then
    echo "Vidage des bases de donnees"
    
    cd ../Services

    for i in "${services_array[@]}"
    do
        cd $i
        echo "" > db.json
        cd ../
    done
fi