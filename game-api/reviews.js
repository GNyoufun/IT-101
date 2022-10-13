const ObjectId = require('mongodb').ObjectId;
const {
    retrieveCollection,
    updateCollection,
    deleteCollection,
    updateUserToken,
    insertUser,
    retrieveUserById,
} = require('./databaseSrc/mongooseFunc.js');
const {
    review
} = require('./databaseSrc/mongooseSchema.js');

/**
 * Review requests
 */
module.exports = function (app) {
    app.get('/users/:user_id/reviews', async (req, res, next) => {
        res.send('get');
    });

    app.post('/users/:user_id/reviews', async (req, res, next) => {
        res.send('post');
    });

    app.delete('/users/:user_id/reviews', async (req, res, next) => {
        res.send('delete');
    });

    app.get('/users/:user_id/reviews/:game', async (req, res, next) => {
        res.send('get game');
    });

    app.delete('/users/:user_id/reviews/:game', async (req, res, next) => {
        res.send('delete game');
    });

    app.get('/users/:user_id/reviews/:game/:friend', async (req, res, next) => {
        res.send('get game friend');
    });

    app.get('/users/:user_id/reviews/:raid_id', async (req, res, next) => {
        res.send('get raid id');
    });

    app.put('/users/:user_id/reviews/:raid_id', async (req, res, next) => {
        res.send('put raid id');
    });

    app.delete('/users/:user_id/reviews/:raid_id', async (req, res, next) => {
        res.send('delete raid id');
    });
};