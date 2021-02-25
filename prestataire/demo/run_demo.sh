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


npm install
npm test

if [ $kill = 1 ]
then
    echo "Kill des serveurs"
    pm2 kill
fi

if [ $db = 1 ]
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