const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');

const PORT = 4006;

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
    throw dotenvConfig.error;
}

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log("Place service running on port " + PORT);
});
