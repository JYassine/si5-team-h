# si5-team-h

## Pour lancer la demo :

cd demo && sudo sh run.sh

option disponibles :

-k : kill les serveurs à la fin de l execution
-db : ne vide pas les bases de donnees apres l execution (dont les tests)

## Pour debugger

- Ne pas kill les serveurs en n'utilisant pas l'option -k
- Lancer la commande `sudo pm2 logs`
- Kill les serveurs avec la commande `sudo pm2 kill`

## Ports utilisés: 

- Travel Service: 4001
- Routing Service: 4002
- Payment Service: 4003
- Booking Service: 4004
