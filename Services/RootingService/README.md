# Rooting service

## Run
**npm start**  
**npm run dev** to run with nodemon  
Service runs on port 4002  

## Exposed API
### Travel :
GET /travels => Get travels matching the parameters   
-> Parameters: from, to, options  
GET /travels/:id => Get travels with a certain id  

### Booking :
GET /bookings => Get all booking  
POST /bookings => Add a new booking  
     
```json
{   
    "id" : "{String}",
    "idsTravel" : "[{String}]"     
}
```

### Payment :
POST /payment

```json
{   
    "payment_method" : "{String}",
    "idBooking" : "{String}",
    "currency" : "{String}",
    "total" : "{String}"      
}
```

### Account :
POST /account/inscription => Creation of the travel agency account  
```json
{   
    "login": "travel",
    "password": "bla",
    "agencyName": "TravelBrest",
    "mail": "test123@gmail.com"   
}
```
POST /account/connexion => Return the agency ID if the login and password are correct
```json
{   
    "login": "travel",
    "password": "bla" 
}
```
POST /account => Return the information of the agency associate to the given ID
```json
{"id":"agency1f54rz3dekkgy2lh2a"}
```
