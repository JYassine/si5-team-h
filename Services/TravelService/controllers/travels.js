const getHello = async () => {
    try {

        let voyages = [
            {
                "id": "NP1",
                "depart": "Nice",
                "arrivee": "Paris",
                "heureDepart": "9h30",
                "heureArrivee": "15h30",
                "prix": 29
            },
            {
                "id": "NP2",
                "depart": "Nice",
                "arrivee": "Paris",
                "heureDepart": "8h30",
                "heureArrivee": "13h00",
                "prix": 59
            },
            {
                "id": "NB1",
                "depart": "Nice",
                "arrivee": "Brest",
                "heureDepart": "6h00",
                "heureArrivee": "16h00",
                "prix": 89
            }
        ]
        return voyages;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getHello
};