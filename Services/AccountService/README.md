# si5-team-h

## Run
**npm start**  
**npm run dev** to run with nodemon  
Service runs on port 4005 

**Run test**

- npm test

## Exposed API
POST /inscription => Creation of the travel agency account <br/>
GET /connexion => Return the agency ID if the login and password are correct <br/>
GET /account => Return the information of the agency associate to the given ID <br/>

Request Body Inscription
----

```json
{
    "login": "travel",
    "password": "bla",
    "agencyName": "TravelBrest",
    "mail": "test123@gmail.com"
}
```
Response Body Inscription
----
```
Account created
```

Request Body Connexion
----

```json
{
    "login": "travel",
    "password": "bla"
}
```
Response Body Connexion
----
```
"agency1f54rz3dekkgy2lh2a"
```

Request Body Account
----

```json
{"id":"agency1f54rz3dekkgy2lh2a"}
```
Response Body Connexion
```json
{
    "agencyName": "TravelBrest",
    "mail": "test123@gmail.com"
}
```
       
