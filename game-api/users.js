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
    userid
} = require('./databaseSrc/mongooseSchema.js');

// Import the module used for hashing passwords and generating tokens
const crypto = require('./crypto.js');

/**
 * User Requests
 */
module.exports = function (app) {
    /**
     * login a user via their username and password
     * @header username
     * @header password
     * @responseBody list of tokens (should only be one), token fields are {_id, token}
     */
    app.get('/users/login', async (req, res, next) => {
        console.log('Starting GET request /users/login');
        if(req.headers.username === undefined || req.headers.password === undefined) {
            // no username/password specified
            res.sendStatus(401);
            console.log('Failed GET request /users/login, 401. No username or password specified');
            return;
        }
    
        // create a query with the user and a hash of the password
        const query = {
            UserName: req.headers.username,
        };
        const result = await retrieveCollection(userid, query, { Token: 1, UserPassword: 1 , UserName: 1});
        const responseUser = result[0];
        if(result.length === 0) {
            // no such user found
            res.sendStatus(400);
            console.log('Failed GET request /users/login, 400');
        }
        else {
            // Check that the password matches
            if(await crypto.checkPassword(req.headers.password, responseUser.UserPassword)) {
                
                // Remove the password from the response
                delete responseUser.UserPassword;
                //console.log("Username:" + responseUser.UserName);
    
                // Generate a new token
                const token = await crypto.generateToken(req.headers.username, req.headers.password);
    
                // Update the token in the database
                const update = {
                    Token: token
                };
                
                updateUserToken(responseUser._id, token.toString());
    
                // Add the token to the response
                responseUser.Token = token;
    
                res.json(responseUser);
                res.status(200);
                console.log('Successful GET request /users/login');
            }
            else {
                res.sendStatus(401);
                console.log('Failed GET request /users/login, 401. Password does not match');
            }
        }
    });
    
    // Use Auth for all requests for users*
    app.use('/users/:user_id*', require('./auth.js').authenticate);
    
    /**
     * get all users
     * @header Authorization, should be user_id:token
     * @responseBody list of users, user fields are {_id, username}
     */
    app.get('/users', async (req, res, next) => {
        // TODO: Make Secure
        console.log('Starting GET request /users');
        res.status(200);
        res.json(await retrieveCollection(userid, {}, { UserName: 1 }));
        console.log('Successful GET request /users');
    });
    
    /**
     * create a new user
     * accepts json or urlencoded bodies
     * @header Authorization, should be user_id:token
     * @body username
     * @body password
     */
    app.post('/users', async (req, res, next) => {
        console.log('Starting POST request /users');
    
        // Check that the username and password were provided
        if (req.body.username === undefined || req.body.password === undefined)
        {
            res.sendStatus(400);
            console.log('Failed POST request /users. Not all data is present');
            return;
        }
    
        // check if a user with the same username already exists
        const query = {
            UserName: req.body.username
        };
        if((await retrieveCollection(userid, query)).length > 0) {
            res.sendStatus(400);
            console.log('Failed POST request /users. User already exists');
            return;
        }
    
        // Create new user and hash the password
        const user = {
            UserName: req.body.username,
            UserPassword: await crypto.hashPassword(req.body.password),
            Token: "",
            Games: []
        };
    
        // Insert the user into the database
        var uid = await insertUser(user);
        console.log(uid);
    
        // Get the user from the database
        const result = await retrieveUserById(uid, query);
        console.log(result);
    
        if (result == null || result.length === 0) {
            res.sendStatus(500);
            console.log('Failed POST request /users. User was not inserted into the database');
            return;
        }
    
        // Return the user's data to the client without the password
        delete result.UserPassword;
    
        // Generate a new token
        const token = await crypto.generateToken(req.body.username, req.body.password);
    
        // Update the token in the database
        updateUserToken(result, token.toString());
    
        // Add the token to the response
        result.Token = token;
    
        // Attach a 201 and return the user object with a token
        res.status(200);
        res.json(result);
        res.send();
        console.log('Successful POST request /users');
    });
    
    
    /** 
     * get a specific user
     * @path user_id, should be 24 character hexadecimal string
     * @header Authorization, should be user_id:token
     * @responseBody user json object, user fields are {_id, username}
     */
    app.get('/users/:user_id', async (req, res, next) => {
        console.log('Starting GET request /users/%s', req.params.user_id);
        try {
            const id = ObjectId(req.params.user_id);
            const result = await retrieveCollection(userid, { _id: id }, { UserName: 1 });
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
    
    /**
     * update a specific user
     * accepts json or urlencoded bodies
     * @path user_id, should be 24 character hexadecimal string
     * @header Authorization, should be user_id:token
     * @body username
     * @body password
     */
    app.put('/users/:user_id', async (req, res, next) => {
        console.log('Starting PUT request /users/%s', req.params.user_id);

        // TODO: update relevant reviews when user is updated

        // check if the provided user_id is valid
        try {
        const id = ObjectId(req.params.user_id);
    
        // Check that the username and password were provided
        if (req.body.username === undefined || req.body.password === undefined)
        {
            res.sendStatus(403);
            console.log('Failed PUT request /users/%s. Not all data is present', req.params.user_id);
            return;
        }

        // Check that the user's password is correct
        const checkQuery = {
            _id: id
        };

        const checkResult = await retrieveCollection(userid, checkQuery);
        if (checkResult.length === 0) {
            res.sendStatus(404);
            console.log('Failed PUT request /users/%s. User does not exist', req.params.user_id);
            return;
        }

        const checkUser = checkResult[0];
        
        if (!await crypto.checkPassword(req.body.password, checkUser.UserPassword)) {
            res.sendStatus(400);
            console.log('Failed PUT request /users/%s. Password does not match', req.params.user_id);
            return;
        }
    
        // Update the user's username and password
        const user = {
            UserName: req.body.username,
            UserPassword: await crypto.hashPassword(req.body.newPassword)
        };
    
        const result = await updateCollection(userid, { _id: id }, { $set: user });
        if (result.matchedCount === 0) {
            // not found user id
            res.sendStatus(404);
            console.log('Failed PUT request /users/$s, 404', req.params.user_id);
        } else {
            // success
            if (result.matchedCount > result.modifiedCount) {
            console.warn('Matched more than modified. %d matched, %d modified', result.matchedCount, result.modifiedCount);
            }
            res.sendStatus(200);
            console.log(result.modifiedCount + " document(s) updated");
            console.log('Successful PUT request /users/%s', req.params.user_id);
        }
        } catch (err) {
        // invalid (not found) user id
        res.sendStatus(404);
        console.error(err);
        console.log('Failed PUT request /users/$s, 404', req.params.user_id);
        }
    });
    
    /**
     * delete a specified user
     * @path user_id, should be 24 character hexadecimal string
     * @header Authorization, should be user_id:token
     */
    app.delete('/users/:user_id', async (req, res, next) => {
        console.log('Starting DELETE request /users/%s', req.params.user_id);
        // check if the provided user_id is valid
        try {
        const id = ObjectId(req.params.user_id);
        const result = await deleteCollection(userid, { _id: id });
        if (result === 0) {
            // not found user id
            res.sendStatus(404);
            console.log('Failed DELETE request /users/$s, 404', req.params.user_id);
        } else {
            // success
            if (result > 1) {
            console.warn('Deleted more than one user. %d users deleted', result);
            }
            res.sendStatus(200);
            console.log('Successful DELETE request /users/%s', req.params.user_id);
        }
        } catch (err) {
        // invalid (not found) user id
        res.sendStatus(404);
        console.error(err);
        console.log('Failed DELETE request /users/$s, 404', req.params.user_id);
        }
    });
    
    // logout a specified user
    app.get('/users/:user_id/logout', async (req, res, next) => {
        res.send('Logout user_id');
    });
};

