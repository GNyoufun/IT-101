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
    /**
     * gets all of the teammates for a particular game associated with a user
     * @path user_id, should be 24 character hexadecimal string
     * @path game, title of the specified game
     * @header Authorization, should be user_id:token
     * @responseBody list of teammates
     */
    app.get('/users/:user_id/teammates/:game', async (req, res, next) => {
        console.log('Starting GET request /users/%s/teammates/%s', req.params.user_id, req.params.game);
        try {
            const id = ObjectId(req.params.user_id);
            const game = req.params.game;

            var team = await extractTeam(game, id);

            if (team == null) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed GET request /users/%s/teammates/%s, 404', req.params.user_id, req.params.game);
            } else  {
                // success
                res.status(200);

                res.json(team);
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