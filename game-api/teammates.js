const ObjectId = require('mongodb').ObjectId;
const {
    retrieveCollection,
    extractTeam
} = require('./databaseSrc/mongooseFunc.js');
const {
    review
} = require('./databaseSrc/mongooseSchema.js');

/**
 * Teammates requests
 */
module.exports = function (app) {
    app.get('/users/:user_id/teammates/:game', async (req, res, next) => {
        console.log('Starting GET request /users/%s/teammates/%s', req.params.user_id, req.params.game);
        try {
            const id = ObjectId(req.params.user_id);
            const game = req.params.game;

            const result = await retrieveCollection(review, { UserId: id, Title: game }, { });
            if (result.length === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed GET request /users/%s/teammates/%s, 404', req.params.user_id, req.params.game);
            } else {
                // success
                res.status(200);
                res.json(extractTeam(result));
                console.log('Successful GET request /users/%s/teammates/%s', req.params.user_id, req.params.game);
            }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed GET request /users/%s/teammates/%s, 404', req.params.user_id, req.params.game);
        }
    });
};