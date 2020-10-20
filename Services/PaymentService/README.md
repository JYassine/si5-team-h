# si5-team-h

## Run
**npm start**  
**npm run dev** to run with nodemon  
Service runs on port 4003 

**Run test**

- npm test

## Exposed API
POST /payment => create a new order of payment (return link of payment) 
    - Request body : 
        {
            "payment_method" : {String},
            "idBooking" : {String - should exist in booking service},
            "currency" : {String},
            "total" : {String}
        }
    - Response body
    {
        "id": {String},
        "idBooking": {String},
        "currency": {String},
        "total": {String},
        "payment_method": {String},
        "linkPayment": "http://localhost:4003/payment/execute/{payment_method}-{id}"

    }
       
