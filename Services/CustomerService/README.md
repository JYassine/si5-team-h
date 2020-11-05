# si5-team-h

## Run
**npm start**  
**npm run dev** to run with nodemon  
Service runs on port 4008

**Run test**

- npm test

## Exposed API
GET /customers => return all customers <br/>

GET /customers/{id} => get customer with the id {id} <br/>

GET /customers/?firstName={firstName}&lastName={lastName} => return customer with firstName {firstName} and lastName {lastName} <br/>

Response Body
----
```json
{
    "id": "{String}",
    "firstName": "{String}",
    "lastName": "{String}",
    "mail": "{String}",
    "age": "{Integer}",
    "gender": "{Character}",
    "info": "{String}"
}
```

       
