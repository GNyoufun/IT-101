const ObjectId = require('mongodb').ObjectId;
const {
    retrieveCollection,
    updateCollection,
    deleteCollection,
    updateUserToken,
    insertUser,
    retrieveUserById,
    bestWinRate,
    gameWinRate,
    retrieveLastN,
    totalTimeByDay,
    totalTime,
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
            // Convert the user ID to an object ID
            const id = ObjectId(req.params.user_id);

            // Construct a summary for the user's dashboard
            var result = {}; //await retrieveCollection(userid, { _id: id }, { UserName: 1 });
            var promiseRecentRaids = retrieveLastN(5, id);
            var promiseMostWon = bestWinRate(id);
            var promiseTimeSpent = totalTime(id);
            var promiseTimeSpentEach = totalTimeByDay(id);

            // TODO: Check data return validity
            promiseRecentRaids.then(function (value) {
                result.RecentRaids = value;
            });
            promiseMostWon.then(function (value) {
                result.MostWon = value;
            });
            promiseTimeSpent.then(function (value) {
                result.TimeSpent = value;
            });
            promiseTimeSpentEach.then(function (value) {
                result.TimeSpentEach = value;
            });

            // Wait for all the results before sending the response
            await Promise.all([promiseRecentRaids, promiseMostWon, promiseTimeSpent, promiseTimeSpentEach]);

            console.log(result);

            if(result.length === 0) {
                // not found user id
                res.sendStatus(404);
                console.log('Failed GET request /users/%s/summary, 404', req.params.user_id);
            }
            else {
                // success
                res.status(200);
                res.json(result);
                console.log('Successful GET request /users/%s/summary', req.params.user_id);
            }
        }
        catch (err) {
            // invalid (not found) user id
            res.sendStatus(404);
            console.error(err);
            console.log('Failed GET request /users/%s/summary, 404', req.params.user_id);
        }
    });
};