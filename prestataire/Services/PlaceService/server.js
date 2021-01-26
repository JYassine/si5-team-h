const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
    throw dotenvConfig.error;
}

const PORT = process.env.PLACE_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log("Place service running on port " + PORT);
});
