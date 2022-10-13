// Database connection
const mongooseSchema = require('./databaseSrc/mongooseSchema.js');
const connectDB = require('./databaseSrc/mongoose.js');

const mongoose = require('mongoose');

// Connect to MongoDB
connectDB();
mongoose.connection.once('open', () => {
    console.log ('Connected to MongoDB');
});

/**
 * Authenticates a given request as a given user
 * @param {*} req the request to verify
 * @param {*} res the response to send
 * @param {*} next the next function to call
 */
module.exports.authenticate = (req, res, next) => {
    //console.log("User ID Requested: " + req.params['user_id']);
    if (req.get('Authorization')) {
        // console.log('Authorization header found: ' + req.get('Authorization'));

        // Get the authorizing user and their token
        var authUser = req.get('Authorization').split(':')[0];
        var token = req.get('Authorization').split(':')[1];

        // Check that the user is the same as the page they are accessing (no one can access another user's page)
        if (authUser != req.params['user_id']) {
            console.log('User in Authorization header does not match user in URL');
            res.status(401).send('Unauthorized');
            return;
        }

        // Parse the user as a mongoose object
        //authUser = parseInt(authUser);

        //console.log("Authenticating user: " + authUser + " with token: " + token);
        
        // Find the user in the database
        mongooseSchema.userid.findById(authUser, (err, user) => {
            if (err) {
                console.log('Error: ' + err);
                res.status(500).send('Error');
            } else if (!user) {
                console.log('User not found');
                res.status(404).send('User not found');
            } else {
                // console.log('User found: ' + user);
                if (user.Token == token) {
                    // console.log('Token matches');
                    next();
                } else {
                    console.log('Token does not match');
                    res.status(401).send('Unauthorized')
                    return;
                }
            }
        });
    } else {
        res.status(403).send('Forbidden');
    }
}