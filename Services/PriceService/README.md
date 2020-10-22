# si5-team-h

## Run
**npm start**  
**npm run dev** to run with nodemon  
Service runs on port 4005 

**Run test**

- npm test

## Exposed API
POST /price => Return the price sum of all options taken <br/>

Request Body
----

```json
{
    "idBooking" : "{String}",
    "options" : "{Array}",
}
```
Response Body
----
```json
{
    "id": "{String}",
    "idBooking": "{String}",
    "priceOptions": "{Integer}"
}
```

       
