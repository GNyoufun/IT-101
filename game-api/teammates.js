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
 * Teammates requests
 */
module.exports = function (app) {
    app.get('/users/:user_id/teammates/:game', async (req, res, next) => {
        res.send('get user id game');
    });
};