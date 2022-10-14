const ObjectId = require('mongodb').ObjectId;
const {
    retrieveCollection,
    updateCollection,
} = require('./databaseSrc/mongooseFunc.js');
const {
    userid
} = require('./databaseSrc/mongooseSchema.js');

/**
 * Game requests
 */
module.exports = function (app) {
    /**
     * get all the games of a user
     * @path user_id, should be 24 character hexadecimal string
     * @header Authorization, should be user_id:token
     * @responseBody list of games, game fields are { GameTitle, GameType }
     */
    app.get('/users/:user_id/games', async (req, res, next) => {
        console.log('Starting GET request /users/%s/games', req.params.user_id);
        try {
            console.log('id: %s', req.params.user_id);
            const id = ObjectId(req.params.user_id);
            console.log('id: %s', id);
            const result = await retrieveCollection(userid, { _id: id }, { _id: 0, Games: 1 });
            if (result.length === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed GET request /users/%s/games, 404', req.params.user_id);
            } else {
                // success
                res.status(200);
                res.json(result[0].Games);
                console.log('Successful GET request /users/%s/games', req.params.user_id);
            }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed GET request /users/%s/games, 404', req.params.user_id);
        }
    });
    
    /**
     * add a game for a user
     * @path user_id, should be 24 character hexadecimal string
     * @header Authorization, should be user_id:token
     * @body gametitle, title of the game
     * @body gametype, genre of the game
     */
    app.post('/users/:user_id/games', async (req, res, next) => {
        console.log('Starting POST request /users/%s/games', req.params.user_id);
        try {
        // check for invalid attributes or pre-existing game
        const id = ObjectId(req.params.user_id);
        const query = {
            _id: id,
            'Games.GameTitle': req.body.GameTitle,
            'Games.GameType': req.body.GameType
        };
        console.log('query: %s', query);
        const invalid = Boolean(
            req.body.GameTitle === undefined ||
            req.body.GameTitle === undefined ||
            (await retrieveCollection(userid, query)).length > 0
        );
        if (invalid) {
            // bad request
            res.sendStatus(400);
            console.log('Failed POST request /users/%s/games, 400', req.params.user_id);
            return;
        }
    
        // add the new game
        const game = {
            GameTitle: req.body.GameTitle,
            GameType: req.body.GameType
        };

        // Double check data is good
        if (game.GameTitle === "" || game.GameType === "") {
            // bad request
            res.sendStatus(400);
            console.log('Failed POST request /users/%s/games, 400', req.params.user_id);
            return;
        }

        // Try to update the collection
        const result = await updateCollection(userid, { _id: id }, { $push: { Games: game } });
        if (result.matchedCount === 0) {
            // not found user id
            res.sendStatus(404);
            console.log('Failed POST request /users/%s/games, 404', req.params.user_id);
        } else {
            // success
            if (result.matchedCount > result.modifiedCount) {
                console.warn('Matched more than modified. %d matched, %d modified', result.matchedCount, result.modifiedCount);
            }
            res.sendStatus(200);
            console.log('Successful POST request /users/%s/games', req.params.user_id);
        }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed POST request /users/%s/games, 404', req.params.user_id);
        }
    });
    
    /**
     * get a specific game of a user
     * @path user_id, should be 24 character hexadecimal string
     * @path game, the name of the game
     * @header Authorization, should be user_id:token
     * @responseBody one game json object, game fields are { GameTitle, GameType }
     */
    app.get('/users/:user_id/games/:game', async (req, res, next) => {
        console.log('Starting GET request /users/%s/games/%s', req.params.user_id, req.params.game);
        try {
        const id = ObjectId(req.params.user_id);
        const result = await retrieveCollection(userid, { _id: id, 'Games.GameTitle': req.params.game }, { _id: 0, Games: 1 });
        if (result.length === 0) {
            // not found user id
            res.sendStatus(404);
            console.log('Failed GET request /users/%s/games/%s, 404', req.params.user_id, req.params.game);
        } else {
            // success
            res.status(200);
            res.json(result[0].Games.find(x => x.GameTitle === req.params.game));
            console.log('Successful GET request /users/%s/games/%s', req.params.user_id, req.params.game);
        }
        } catch (err) {
        // invalid (not found) user id
        res.sendStatus(404);
        console.error(err);
        console.log('Failed GET request /users/%s/games/%s, 404', req.params.user_id, req.params.game);
        }
    });
    
    /**
     * update a specific game of a user
     * @path user_id, should be 24 character hexadecimal string
     * @path game, the name of the game
     * @header Authorization, should be user_id:token
     * @body gametitle, title of the game
     * @body gametype, genre of the game
     */
    app.put('/users/:user_id/games/:game', async (req, res, next) => {
        console.log('Starting PUT request /users/%s/games/%s', req.params.user_id, req.params.game);

        // TODO: update relevant reviews when games are updated

        // check if the provided user_id is valid
        try {
        const id = ObjectId(req.params.user_id);
    
        // Check that the gametitle and gametype were provided
        if (req.body.gametitle === undefined || req.body.gametype === undefined)
        {
            res.sendStatus(400);
            console.log('Failed PUT request /users/%s/games/%s. Not all data is present', req.params.user_id, req.params.game);
            return;
        }
    
        // Create the new game object
        const game = {
            GameTitle: req.body.gametitle,
            GameType: req.body.gametype
        };
    
        const result = await updateCollection(userid, { _id: id, 'Games.GameTitle': req.params.game}, { $set: { "Games.$": game } });
        if (result.matchedCount === 0) {
            // not found user id
            res.sendStatus(404);
            console.log('Failed PUT request /users/%s/games/%s, 404', req.params.user_id, req.params.game);
        } else {
            // success
            if (result.matchedCount > result.modifiedCount) {
            console.warn('Matched more than modified. %d matched, %d modified', result.matchedCount, result.modifiedCount);
            }
            res.sendStatus(200);
            console.log('Successful PUT request /users/%s/games/%s', req.params.user_id, req.params.game);
        }
        } catch (err) {
        // invalid (not found) user id
        res.sendStatus(404);
        console.error(err);
        console.log('Failed PUT request /users/%s/games/%s, 404', req.params.user_id, req.params.game);
        }
    });
    
    /**
     * update a specific game of a user
     * @path user_id, should be 24 character hexadecimal string
     * @path game, the name of the game
     * @header Authorization, should be user_id:token
     */
    app.delete('/users/:user_id/games/:game', async (req, res, next) => {
        console.log('Starting DELETE request /users/%s/games/%s', req.params.user_id, req.params.game);
        // check if the provided user_id is valid
        try {
        const id = ObjectId(req.params.user_id);
        const result = await updateCollection(userid, { _id: id, 'Games.GameTitle': req.params.game}, { $pull: { Games: { GameTitle: req.params.game } } });
        if (result.matchedCount === 0) {
            // not found user id or game
            res.sendStatus(404);
            console.log('Failed DELETE request /users/%s/games/%s, 404', req.params.user_id, req.params.game);
        } else {
            // success
            if (result.matchedCount > result.modifiedCount) {
            console.warn('Matched more than modified. %d matched, %d modified', result.matchedCount, result.modifiedCount);
            } else if(result.modifiedCount > result.matchedCount) {
            console.warn('Modified more than matched. %d matched, %d modified', result.matchedCount, result.modifiedCount);
            }
            res.sendStatus(200);
            console.log('Successful DELETE request /users/%s/games/%s', req.params.user_id, req.params.game);
        }
        } catch (err) {
        // invalid (not found) user id
        res.sendStatus(404);
        console.error(err);
        console.log('Failed DELETE request /users/%s/games/%s, 404', req.params.user_id, req.params.game);
        }
    });
};