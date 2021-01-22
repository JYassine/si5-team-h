services_list=$(ls ../Services/)
mapfile -t services_array <<< "$services_list"

echo "Vidage des bases de donnees"

cd ../Services

for i in "${services_array[@]}"
do
    cd $i
    echo "" > db.json
    cd ../
done