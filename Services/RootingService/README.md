# Rooting service

## Run
**npm start**  
**npm run dev** to run with nodemon  
Service runs on port 4002  

## Exposed API
### Travel :
GET /travels => Get all travels

### Booking :
POST /bookings => Add a new booking
    -> body : {id : {specify an Id}, idTravel : {specify the travel id}}
GET /bookings => Get all booking