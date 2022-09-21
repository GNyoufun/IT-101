require('dotenv').config({ path: './databaseSrc/.env'});
const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
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

/**
 * get all users
 * @header token (not implemented)
 * @responseBody list of users, user fields are {_id, username}
 */
app.get('/users', async (req, res, next) => {
    console.log('Starting GET request /users');
    res.status(200);
    res.json(await retrieveReview(userid, {}, { UserName: 1 }));
    console.log('Successful GET request /users');
});

/**
 * create a new user
 * accepts json or urlencoded bodies
 * @header token (not implemented)
 * @body username
 * @body password
 */
app.post('/users', async (req, res, next) => {
    console.log('Starting POST request /users');
    // check if a user with the same username and password already exist
    const query = {
        UserName: req.body.username,
        UserPassword: req.body.password
    };
    if((await retrieveReview(userid, query)).length > 0) {
        res.sendStatus(400);
        console.log('Failed POST request /users');
        return;
    }

    // create new user
    const user = {
        UserName: req.body.username,
        UserPassword: req.body.password,
        Token: "",
        Games: []
    };
    await insertReivew(userid, [user]);
    res.sendStatus(200);
    console.log('Successful POST request /users');
});

/**
 * login a user via their username and password
 * @header username
 * @header password
 * @responseBody list of tokens (should only be one), token fields are {_id, token}
 */
app.get('/users/login', async (req, res, next) => {
    console.log('Starting GET request /users/login');
    if(req.headers.username === undefined || req.headers.password === undefined) {
        // no username/password specified
        res.sendStatus(401);
        console.log('Failed GET request /users/login, 401');
        return;
    }

    const query = {
        UserName: req.headers.username,
        UserPassword: req.headers.password
    };
    const result = await retrieveReview(userid, query, { Token: 1 });
    if(result.length === 0) {
        // no such user found
        res.sendStatus(400);
        console.log('Failed GET request /users/login, 400');
    }
    else {
        // success
        res.status(200);
        res.json(result);
        console.log('Successful GET request /users/login');
    }
});

/** 
 * get a specific user
 * @path user_id, should be 24 character hexadecimal string
 * @header token (not implemented)
 * @responseBody list of users (should only be one), user fields are {_id, username}
 */
app.get('/users/:user_id', async (req, res, next) => {
    console.log('Starting GET request /users/%s', req.params.user_id);
    try {
        const id = ObjectId(req.params.user_id);
        const result = await retrieveReview(userid, { _id: id }, { UserName: 1 });
        if(result.length === 0) {
            // not found user id
            res.sendStatus(404);
            console.log('Failed GET request /users/$s, 404', req.params.user_id);
        }
        else {
            // success
            res.status(200);
            res.json(result);
            console.log('Successful GET request /users/%s', req.params.user_id);
        }
    }
    catch (err) {
        // invalid (not found) user id
        res.sendStatus(404);
        console.error(err);
        console.log('Failed GET request /users/$s, 404', req.params.user_id);
    }
});

// update a specific user
app.put('/users/:user_id', async (req, res, next) => {
    res.send('Update user_id');
});

/**
 * delete a specified user
 * @path user_id, should be 24 character hexadecimal string
 * @header token (not implemented)
 */
app.delete('/users/:user_id', async (req, res, next) => {
    console.log('Starting DELETE request /users/%s', req.params.user_id);
    // check if the provided user_id is valid
    try {
        const id = ObjectId(req.params.user_id);
        const result = await deleteReivew(userid, { _id: id });
        if(result === 0) {
            // not found user id
            res.sendStatus(404);
            console.log('Failed DELETE request /users/$s, 404', req.params.user_id);
        }
        else {
            // success
            if(result > 1) {
                console.warn('Deleted more than one user');
            }
            res.sendStatus(200);
            console.log('Successful DELETE request /users/%s', req.params.user_id);
        }
    } 
    catch (err) {
        // invalid (not found) user id
        res.sendStatus(404);
        console.error(err);
        console.log('Failed DELETE request /users/$s, 404', req.params.user_id);
    }
});

// logout a specified user
app.get('/users/:user_id/logout', async (req, res, next) => {
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
});

// TCP connection

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
    console.log('Express web app available at localhost: ${port}');
});

module.exports = app;