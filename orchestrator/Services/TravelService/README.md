# si5-team-h

## Run
**npm start**  
**npm run dev** to run with nodemon  
Service runs on port 4001  

**Run test**

- npm test

## Exposed API
GET /travels?query => returns list of travels matching query  
Query params: from, to, options, id (of the customer)   

Response Body
----
```json
[
    {
      "id": "{String}",
      "from": "{String}",
      "to": "{String}",
      "departureTime": "{String}",
      "arrivingTime": "{String}",
      "price": "{Integer}",
      "options": "{Array}",
      "pmr": "{Boolean}",
      "taken": "{Boolean}"
    }
]
```
GET /travels/:id => returns travel matching train id  

```json
    {
      "id": "{String}",
      "from": "{String}",
      "to": "{String}",
      "departureTime": "{String}",
      "arrivingTime": "{String}",
      "price": "{Integer}",
      "options": "{Array}",
      "pmr": "{Boolean}",
      "taken": "{Boolean}"
    }
```
