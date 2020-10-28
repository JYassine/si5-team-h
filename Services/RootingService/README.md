# Rooting service

## Run
**npm start**  
**npm run dev** to run with nodemon  
Service runs on port 4002  

## Exposed API
### Travel :
GET /travels => Get all travels

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
