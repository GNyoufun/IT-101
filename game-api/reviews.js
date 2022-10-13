const ObjectId = require('mongodb').ObjectId;
const {
    retrieveReview,
    updateReivew,
    deleteReivew,
    updateUserToken,
    insertUser,
    retrieveUserById,
    insertCollection,
} = require('./databaseSrc/mongooseFunc.js');
const {
    review
} = require('./databaseSrc/mongooseSchema.js');

/**
 * Review requests
 */
module.exports = function (app) {
    /**
     * get all the reviews of a user
     * @path user_id, should be 24 character hexadecimal string
     * @header Authorization, should be user_id:token
     * @responseBody list of reviews
     */
    app.get('/users/:user_id/reviews', async (req, res, next) => {
        console.log('Starting GET request /users/%s/reviews', req.params.user_id);
        try {
            const id = ObjectId(req.params.user_id);
            const result = await retrieveCollection(userid, { UserId: id }, {});
            if (result.length === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed GET request /users/$s/reviews, 404', req.params.user_id);
            } else {
                // success
                res.status(200);
                res.json(result);
                console.log('Successful GET request /users/%s/reviews', req.params.user_id);
            }
            } catch (err) {
                // invalid (not found) user id
                res.sendStatus(404);
                console.error(err);
                console.log('Failed GET request /users/$s/reviews, 404', req.params.user_id);
        }
    });

    /**
     * add a raid review for a user
     * @path user_id, should be 24 character hexadecimal string
     * @header Authorization, should be user_id:token
     * @body gametitle, title of the game being reviewed
     * @body date, date of the raid
     * @body team, array of teammates, having fields {in_game_id, level}
     * @body durations, duration of the raid
     * @body result, raid result, can be "Win", "Draw", or "Lost"
     * @body difficulty, raid difficulty from 1-10
     * @body rating, raid rating from 1-10
     * @body comments, additional comments for the raid
     */
    app.post('/users/:user_id/reviews', async (req, res, next) => {
        console.log('Starting POST request /users/%s/reviews', req.params.user_id);
        try {
            // check for invalid attributes
            const id = ObjectId(req.params.user_id);
            const invalid = Boolean(
                req.body.gametitle === undefined ||
                req.body.date === undefined ||
                req.body.team === undefined ||
                req.body.durations === undefined ||
                req.body.result === undefined ||
                req.body.difficulty === undefined ||
                req.body.rating === undefined ||
                req.body.comments === undefined
            );
            if (invalid) {
                // bad request
                res.sendStatus(400);
                console.log('Failed POST request /users/$s/reviews, 400', req.params.user_id);
                return;
            }
        
            // add the new review
            const raidReview = {
                UserId: id,
                Title: req.body.gametitle,
                Date: req.body.date,
                Team: req.body.team,
                Durations: req.body.durations,
                Result: req.body.result,
                Difficulty: req.body.difficulty,
                Rating: req.body.rating,
                comments: req.body.comments
            };
            const result = await insertCollection(review, raidReview);
            if (result.length === 0) {
                // server error in insertion
                res.sendStatus(500);
                console.log('Failed POST request /users/$s/reviews, 500', req.params.user_id);
            } else {
                // success
                if (result.length > 1) {
                    console.warn('Inserted more than one raid review, %d inserted', result.length);
                }
                res.sendStatus(200);
                console.log('Successful POST request /users/%s/reviews', req.params.user_id);
            }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed POST request /users/$s/reviews, 404', req.params.user_id);
        }
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