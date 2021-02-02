# Status

# Week 5

Avancement : Orange flag

- Ajout de l'orchestrateur de travelService
- Les deux environnements des deux compagnies sont créés
- Ajout de l'orchestrateur de customerService

Travail à finir :

- Ajout de l'orchestrateur pour payment
- Ajout de l'orchestrateur pour booking
- Ajout du bus pour envoyer les trains en retards

# Week 4

Avancement : Orange flag

- Début de l'ajout de l'orchestrateur


Travail à finir :

- Pouvoir créer deux instances du même système (gérer les adresses)
- Ajout du bus d'évènement

--------------------------------------------------------------------------------
# Week 45

Avancement: Orange Flag
- Dockerisation des services
- Ajout de CustomerService
- Ajout d'AccountService
- Ajout de LateService
- Update de Routing
- Modification du fichier architectures:
    - Ajout choix technologiques
    - Changements par rapport à l'architecture initiale
    - Faiblesses de notre architecture actuelle
    - Solutions envisagées


Travail à finir:
- Pouvoir ajouter plusieurs clients à une réservation
- Finalisation de LateService
- Préparation de la soutenance

# Week 44

Avancement: Green Flag
- PlaceService 
- PriceService
- Test de TravelService
- Amélioration de TravelService et BookingService pour la prise en charge des options


Travail à faire pour la semaine prochaine:
- Finalisation de la réservation d'un groupe de clients
- Rajouter AccountService pour l'authentification de l'agence de voyage
- LateService pour trajet en retard
- Dockerisation des services
- Update de RoutingService pour tout les différents services
- Préparation de la soutenance de présentation du POC



# Week 43

Avancement: Green Flag

- Ajout d'une démo
- Ajout de Travis
- Création de différents services:
    - BookingService
    - PaymentService
    - PlaceService (en cours)
    - PriceService (en cours)
 - Amélioration de services:
    - TravelService: Renvois les trajets comportant les options choisis par le client
    - BookingService: Créer une réservation avec prise en compte options et profil client
 
- Travail à finir pour vendredi:
    - Finir le PlaceService et PriceService
    - Ajout de test pour le TravelService
    
- Travail pour la semaine prochaine:
    - Amélioration de TravelService et BookingService pour la réservation d'un groupe de client
    


# Week 42

Avancement: Green Flag

- Création de différents services:
    - RootingService (terminé)
    - TravelService (terminé)
    - BookingService (en cours)
    - PaymentService (en cours)
- Choix des technologies:
    - NodeJS pour les services
    - API REST
    
Travail à finir pour vendredi: 
- Finir le BookingService et le PaymentService

Travail pour la semaine prochaine:

- Implémentation de PlaceService et PriceService
- Améliorations de services en place
    - TravelService -> renvoie tout les trajets (un seul train) avec prise en compte du profil client
    - BookingService -> Créer une réservation avec prise en compte options et profil client


# Week 41

Avancement: Green Flag

- Décomposition de l'API en plusieurs composants
- Réécriture de scénarios
- Réalisation d'une Road Map

Travail pour la semaine prochaine:
- Implémentation des premiers services:
    - RootingService 
    - TravelService
    - BookingService
    - PaymentService 
 

# Week 40 

Avancement: Green Flag

- Écriture du scope de notre API
- Écriture de différents scénarios

Travail pour la semaine prochaine:
- Faire un diagramme des différents composants de notre API 
- Découper le projet en plusieurs itérations
- Réaliser une Roadmap 
