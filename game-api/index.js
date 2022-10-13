require('dotenv').config({ path: './databaseSrc/.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// App setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// User requests
require('./users.js')(app);

// Game requests
require('./games.js')(app);

// Review requests
require('./reviews.js')(app);

// Teammates requests
require('./teammates.js')(app);

// TCP connection
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
  console.log(`Express web app available at localhost: ${app.get('port')}`);
});

module.exports = app;
