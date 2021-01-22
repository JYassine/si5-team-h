const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); //Importe le fichier routes.js
const dotenv = require('dotenv');

const PORT = 4011;

const dotenvConfig = dotenv.config()
if (dotenvConfig.error) {
  throw dotenvConfig.error
}

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});