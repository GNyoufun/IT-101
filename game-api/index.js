const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// GET requests

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/users', (req, res, next) => {
    res.send('Return all users');
});

app.get('/users/:user_id', (req, res, next) => {
    res.send('Return user_id');
});

app.get('/users/:user_id/games', (req, res, next) => {
    res.send('Return all games for user_id');
});

app.get('/users/:user_id/games/:game_id', (req, res, next) => {
    res.send('Return game_id for user_id');
});

// POST requests

app.post('/users', (req, res, next) => {
    res.send('Create user');
});

app.post('/users/:user_id', (req, res, next) => {
    res.send('Update user_id');
});

app.post('/users/:user_id/games', (req, res, next) => {
    res.send('Add game for user_id');
});

app.post('/users/:user_id/games/:game_id', (req, res, next) => {
    res.send('Update game_id for user_id');
});

// TCP connection

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Express web app available at localhost: ${port}');
});

module.exports = app;