const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const bodyParser = require('body-parser');

// App setup
const app = express();
app.use(express.static(path.resolve(__dirname, '../game-101/build')));
app.use(bodyParser.json({limit: '200mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "200mb", extended: true, parameterLimit:100000}));
app.use(bodyParser.text({ limit: '2000mb' }));

if (process.env.NODE_ENV === "development") {
  const cors = require('cors');
  app.use(cors());
}

// User requests
require('./users.js')(app);

// Game requests
require('./games.js')(app);

// Review requests
require('./reviews.js')(app);

// Teammates requests
require('./teammates.js')(app);

// Teammates requests
require('./summaries.js')(app);

// TCP connection
app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '../game-101/build/index.html')); });
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
  console.log(`Express web app available at localhost: ${app.get('port')}`);
});

module.exports = app;
