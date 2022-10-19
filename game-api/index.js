const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// App setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.resolve(__dirname, '../game-101/build')));
if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  // app.use(express.static(path.resolve(__dirname, '../game-101/build')));
  app.use(express.static('../game-101/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'game-101', 'build', 'index.html'));
  });
}


app.use(cors());

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
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
  console.log(`Express web app available at localhost: ${app.get('port')}`);
});



module.exports = app;
