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
 * Summary requests
 */
module.exports = function (app) {
    /**
     * Gets the dashboard content summary for a user
     */
    app.get('/users/:user_id/summary', async (req, res, next) => {
        console.log('Starting GET request /users/%s/summary', req.params.user_id);
        try {
            const id = ObjectId(req.params.user_id);
            // TODO: Construct a summary with a few different results from different database functions
            const result = []; //await retrieveCollection(userid, { _id: id }, { UserName: 1 });
            if(result.length === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed GET request /users/$s, 404', req.params.user_id);
            }
            else {
                // success
                res.status(200);
                res.json(result[0]);
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
};