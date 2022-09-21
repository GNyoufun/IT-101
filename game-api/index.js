require('dotenv').config({ path: './databaseSrc/.env'});
const express = require('express');
const bodyParser = require('body-parser');
const {
    retrieveReview,
    insertReivew,
    updateReivew,
    FindReplaceReivew,
    deleteReivew
} = require('./databaseSrc/mongooseFunc.js');
const {
    review,
    userid
} = require('./databaseSrc/mongooseSchema.js');

// App setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User Requests

app.get('/users', async (req, res, next) => {
    console.log('Starting GET request /users');
    res.status(200);
    res.json(await retrieveReview(userid, {}, { UserName: 1 }));
    console.log('Successful GET request /users');
});

app.post('/users', async (req, res, next) => {
    console.log('Starting POST request /users');
    // TODO: check for duplicate users and free id
    const user = {
        _id: 132,
        UserName: req.body.username,
        UserPassword: req.body.userpassword,
        Token: "",
        Games: []
    };
    await insertReivew(userid, [user]);
    res.sendStatus(200);
    console.log('Successful POST request /users');
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