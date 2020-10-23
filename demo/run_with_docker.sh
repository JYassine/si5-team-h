services_list=$(ls ../Services/)
mapfile -t services_array <<< "$services_list"

cd ../Services

for i in "${services_array[@]}"
do
    cd $i
    pwd
    rm .env
    cp ../../.env.docker ./.env
    cd ../
done

cd ../

docker-compose up -d
#containerName="client"
#testIsUp=$( docker container inspect -f '{{.State.Running}}' $containerName )
#while [ $testIsUp != "true" ]
#do
#    sleep 2
#    testIsUp=$( docker container inspect -f '{{.State.Running}}' $containerName )
#done
