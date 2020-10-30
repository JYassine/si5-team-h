## Run
**npm start**  
**npm run dev** to run with nodemon  
Service runs on port 4006

**Run test**

- npm test

## Exposed API
POST /place/:idTrain => returns number of seats available in a train


Response Body
----
```json
{   
    "id": "{String}",
    "firstClass": {
        "noOption": "{Integer}",
        "bicycle": "{Integer}",
        "plug": "{Integer}"
    }      
}
```

POST /bookPlace => books seat(s) and updates number of available seats left in a train

Request Body
----
```json
{   
    "id": "{String}",
    "firstClass": {
        "noOption": "{Integer}",
        "bicycle": "{Integer}",
        "plug": "{Integer}"
    },
    "secondClass": {
        "noOption": "{Integer}",
         "bicycle": "{Integer}",
         "plug": "{Integer}"
    }      
}
```
