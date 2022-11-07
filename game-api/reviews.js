const ObjectId = require('mongodb').ObjectId;
const {
    retrieveCollection,
    updateCollection,
    deleteCollection,
    insertCollection,
} = require('./databaseSrc/mongooseFunc.js');
const {
    review
} = require('./databaseSrc/mongooseSchema.js');
const {
  uploadAWS,
  deleteAWS
} = require('./aws/awsStorage.js')

/**
 * Review requests
 */
module.exports = function (app) {
    /**
     * get all the reviews of a user
     * @path user_id, should be 24 character hexadecimal string
     * @query StartDate, start date of date filter applied to search
     * @query EndDate, end date of date filter applied to search
     * @header Authorization, should be user_id:token
     * @responseBody list of reviews
     */
    app.get('/users/:user_id/reviews', async (req, res, next) => {
        console.log(req.params);
        console.log(req.query);
        console.log('Starting GET request /users/%s/reviews', req.params.user_id);
        try {
            const id = ObjectId(req.params.user_id);
            const query = { UserId: id };
            const date = {};

            // add in optional date params
            if (req.query.StartDate !== undefined) {
                date.$gte = new Date(req.query.StartDate);
            }
            if (req.query.EndDate !== undefined) {
                date.$lte = new Date(req.query.EndDate);
            }
            if (Object.keys(date).length !== 0) {
                query.Date = date;
            }
            
            // query and process result
            const result = await retrieveCollection(review, query, {});
            if (result.length === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed GET request /users/%s/reviews, 404', req.params.user_id);
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
            console.log('Failed GET request /users/%s/reviews, 404', req.params.user_id);
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
            // Console log the request body
            console.log(req.body);

            // Load the user id
            const id = ObjectId(req.params.user_id);

            // check for invalid attributes
            const invalid = Boolean(
                req.body.GameTitle === undefined ||
                req.body.date === undefined ||
                req.body.team === undefined ||
                req.body.durations === undefined ||
                req.body.result === undefined ||
                req.body.difficulty === undefined ||
                req.body.rating === undefined ||
                req.body.comments === undefined || 
                req.body.imageFiles === undefined 
            );
            if (invalid) {
                // bad request
                res.sendStatus(400);
                console.log('Failed POST request /users/%s/reviews, 400', req.params.user_id);
                return;
            }


            // TODO: Add upload function call 
            const files = req.body.imageFiles
            urls = await uploadAWS(files);
        
            // add the new review
            const raidReview = {
                UserId: id,
                Title: req.body.GameTitle,
                Date: new Date(req.body.date), // Parse the Date
                Team: req.body.team,
                Durations: req.body.durations, // Parse the Durations
                Result: req.body.result,
                Difficulty: req.body.difficulty, // Parse the Difficulty
                Rating: req.body.rating, // Parse the Rating
                comments: req.body.comments,
                ImageURL: urls
            };

            // Insert the raid and get the documents inserted
            const result = await insertCollection(review, [raidReview]);
            
            if (result.length === 0) {
                // server error in insertion
                res.sendStatus(500);
                console.log('Failed POST request /users/%s/reviews, 500', req.params.user_id);
                return;
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
            console.log('Failed POST request /users/%s/reviews, 404', req.params.user_id);
        }
    });

    /**
     * delete all the reviews of a certain time period of a user
     * @path user_id, should be 24 character hexadecimal string
     * @query StartDate, start date of date filter applied to search
     * @query EndDate, end date of date filter applied to search
     * @header Authorization, should be user_id:token
     */
    app.delete('/users/:user_id/reviews', async (req, res, next) => {
        console.log('Starting DELETE request /users/%s/reviews', req.params.user_id);
        try {
            const id = ObjectId(req.params.user_id);
            if (req.query.StartDate === undefined || req.query.EndDate === undefined) {
                // bad request
                res.sendStatus(400);
                console.log('Failed DELETE request /users/%s/reviews, 400', req.params.user_id);
                return;
            }

            // query and process result
            const query = {
                UserId: id,
                Date: { $gte: (new Date(req.query.StartDate)), $lte: (req.query.EndDate) }
            }
            const result = await deleteCollection(review, query);
            if (result === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed DELETE request /users/%s/reviews, 404', req.params.user_id);
            } else {
                // success
                console.log('%d reviews deleted', result);
                res.sendStatus(200);
                console.log('Successful DELETE request /users/%s/reviews', req.params.user_id);
            }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed DELETE request /users/%s/reviews, 404', req.params.user_id);
        }
    });

    /**
     * get all the reviews of a specific game of a user
     * @path user_id, should be 24 character hexadecimal string
     * @path game, title of the specified game
     * @header Authorization, should be user_id:token
     * @responseBody list of reviews
     */
    app.get('/users/:user_id/reviews/:game', async (req, res, next) => {
        console.log('Starting GET request /users/%s/reviews/%s', req.params.user_id, req.params.game);
        try {
            const id = ObjectId(req.params.user_id);
            const game = req.params.game;

            const result = await retrieveCollection(review, { UserId: id, Title: game }, {});
            if (result.length === 0) {
                // not found user id or game id
                res.status(200);
                res.json(result);
                // res.sendStatus(404);
                console.log('Successful GET request /users/%s/reviews/%s', req.params.user_id, req.params.game);
                // console.log('Failed GET request /users/%s/reviews/%s, 404', req.params.user_id, req.params.game);
            } else {
                // success
                res.status(200);
                res.json(result);
                console.log('Successful GET request /users/%s/reviews/%s', req.params.user_id, req.params.game);
            }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed GET request /users/%s/reviews/%s, 404', req.params.user_id, req.params.game);
        }
    });

    /**
     * delete all the reviews of a game for a user
     * @path user_id, should be 24 character hexadecimal string
     * @path game, title of the specified game
     * @header Authorization, should be user_id:token
     */
    // app.delete('/users/:user_id/reviews/:game', async (req, res, next) => {
    //     console.log('Starting DELETE request /users/%s/reviews/%s', req.params.user_id, req.params.game);
    //     try {
    //         const id = ObjectId(req.params.user_id);

    //         // query and process result
    //         const result = await deleteCollection(review, { UserId: id, Title: req.params.game });
    //         if (result === 0) {
    //             // not found user id
    //             res.sendStatus(404);
    //             console.log('Failed DELETE request /users/%s/reviews/%s, 404', req.params.user_id, req.params.game);
    //         } else {
    //             // success
    //             console.log('%d reviews deleted', result);
    //             res.sendStatus(200);
    //             console.log('Successful DELETE request /users/%s/reviews/%s', req.params.user_id, req.params.game);
    //         }
    //     } catch (err) {
    //         // invalid (not found) user id
    //         res.sendStatus(404);
    //         console.error(err);
    //         console.log('Failed DELETE request /users/%s/reviews/%s, 404', req.params.user_id, req.params.game);
    //     }
    // });

    /**
     * get all the reviews of a specific game of a user with a specific teammate/friend
     * @path user_id, should be 24 character hexadecimal string
     * @path game, title of the specified game
     * @path friend, the friend/teammate who participated in the raid
     * @header Authorization, should be user_id:token
     * @responseBody list of reviews
     */
    app.get('/users/:user_id/reviews/:game/:friend', async (req, res, next) => {
        console.log('Starting GET request /users/%s/reviews/%s/%s', req.params.user_id, req.params.game, req.params.friend);
        try {
            const id = ObjectId(req.params.user_id);
            const game = req.params.game;

            const result = await retrieveCollection(review, { UserId: id, Title: game, 'Team.InGameID': req.params.friend }, {});
            if (result.length === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed GET request /users/%s/reviews/%s/%s, 404', req.params.user_id, req.params.game, req.params.friend);
            } else {
                // success
                res.status(200);
                res.json(result);
                console.log('Successful GET request /users/%s/reviews/%s/%s', req.params.user_id, req.params.game, req.params.friend);
            }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed GET request /users/%s/reviews/%s/%s, 404', req.params.user_id, req.params.game, req.params.friend);
        }
    });

    /**
     * get a specific review of a specific user
     * @path user_id, should be 24 character hexadecimal string
     * @path raid_id, should be 24 character hexadecimal string
     * @header Authorization, should be user_id:token
     * @responseBody list of reviews
     */
    app.get('/users/:user_id/reviews/:raid_id', async (req, res, next) => {
        console.log('Starting GET request /users/%s/reviews/%s', req.params.user_id, req.params.raid_id);
        try {
            const userId = ObjectId(req.params.user_id);
            const raidId = ObjectId(req.params.raid_id);

            const result = await retrieveCollection(review, { _id: raidId, UserId: userId }, {});
            if (result.length === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed GET request /users/%s/reviews/%s, 404', req.params.user_id, req.params.raid_id);
            } else {
                // success
                res.status(200);
                res.json(result);
                console.log('Successful GET request /users/%s/reviews/%s', req.params.user_id, req.params.raid_id);
            }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed GET request /users/%s/reviews/%s, 404', req.params.user_id, req.params.raid_id);
        }
    });

    /**
     * update a specific review of a specific user
     * @path user_id, should be 24 character hexadecimal string
     * @path raid_id, should be 24 character hexadecimal string
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
    app.put('/users/:user_id/reviews/:raid_id', async (req, res, next) => {
        console.log('Starting PUT request /users/%s/reviews/%s', req.params.user_id, req.params.raid_id);
        try {
            // Console log the request body
            console.log(req.body);

            // Load the ids
            const userId = ObjectId(req.params.user_id);
            const raidId = ObjectId(req.params.raid_id);

            // check for invalid attributes
            const invalid = Boolean(
                req.body.GameTitle === undefined ||
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
                console.log('Failed PUT request /users/%s/reviews/%s, 400', req.params.user_id, req.params.raid_id);
                return;
            }
        
            // created the updated review
            const raidReview = {
                UserId: userId,
                Title: req.body.GameTitle,
                Date: new Date(req.body.date), // Parse the Date
                Team: req.body.team,
                Durations: req.body.durations, // Parse the Durations
                Result: req.body.result,
                Difficulty: req.body.difficulty, // Parse the Difficulty
                Rating: req.body.rating, // Parse the Rating
                comments: req.body.comments
            };
            const result = await updateCollection(review, { _id: raidId, UserId: userId }, { $set: raidReview });
            if (result.length === 0) {
                // server error in update
                res.sendStatus(500);
                console.log('Failed PUT request /users/$s/reviews/%s, 500', req.params.user_id, req.params.raid_id);
            } else {
                // success
                if (result.length > 1) {
                    console.warn('Updated more than one raid review, %d updated', result.length);
                }
                res.sendStatus(200);
                console.log('Successful PUT request /users/%s/reviews/%s', req.params.user_id, req.params.raid_id);
            }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed PUT request /users/$s/reviews/%s, 404', req.params.user_id, req.params.raid_id);
        }
    });

    /**
     * delete a specific review of a specific user
     * @path user_id, should be 24 character hexadecimal string
     * @path raid_id, should be 24 character hexadecimal string
     * @header Authorization, should be user_id:token
     */
    app.delete('/users/:user_id/reviews/:raid_id', async (req, res, next) => {
        console.log('Starting DELETE request /users/%s/reviews/%s', req.params.user_id, req.params.raid_id);
        try {
            const userId = ObjectId(req.params.user_id);
            const raidId = ObjectId(req.params.raid_id);

            console.log('Deleting raid review %s for user %s', raidId, userId);

            // query and process result
            const result = await deleteCollection(review, { _id: raidId, UserId: userId });
            if (result === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed DELETE request /users/%s/reviews/%s, 404', req.params.user_id, req.params.raid_id);
            } else {
                // success
                if (result > 1) {
                    console.warn('Multiple reviews deleted: %d reviews deleted', result);
                }
                res.sendStatus(200);
                console.log('Successful DELETE request /users/%s/reviews/%s', req.params.user_id, req.params.raid_id);
            }
        } catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed DELETE request /users/%s/reviews/%s, 404', req.params.user_id, req.params.raid_id);
        }
    });
};