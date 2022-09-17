const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// User Requests

app.get('/users', (req, res, next) => {
    res.send('Return all users');
});

app.post('/users', (req, res, next) => {
    res.send('Create user');
});

app.get('/users/login', (req, res, next) => {
    res.send('Login user');
});

app.get('/users/:user_id', (req, res, next) => {
    res.send('Return user_id');
});

app.put('/users/:user_id', (req, res, next) => {
    res.send('Update user_id');
});

app.delete('/users/:user_id', (req, res, next) => {
    res.send('Deleting user_id');
})

app.get('/users/:user_id/logout', (req, res, next) => {
    res.send('Logout user_id');
});

// Game requests

app.get('/users/:user_id/games', (req, res, next) => {
    res.send('Return all games for user_id');
});

app.post('/users/:user_id/games', (req, res, next) => {
    res.send('Add game for user_id');
});

app.get('/users/:user_id/games/:game', (req, res, next) => {
    res.send('Return game for user_id');
});

app.put('/users/:user_id/games/:game', (req, res, next) => {
    res.send('Update game for user_id');
});

app.delete('/users/:user_id/games/:game', (req, res, next) => {
    res.send('Delete game for user_id');
})

// TCP connection

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
    console.log('Express web app available at localhost: ${port}');
});

module.exports = app;