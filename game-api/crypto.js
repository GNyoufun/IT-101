// Path name to dotenv file
var str = __dirname + "\\.env";
require('dotenv').config({ path: str });

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


/**
 * Hashes a plain text password and returns the hash
 * @param {*} password the plain text password to hash
 * @returns the hashed password
 */
async function hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

/**
 * Returns true if the password compares correctly to the hash given
 * @param {*} password the plaintext password
 * @param {*} hash the hash to compare to
 * @returns true or false
 */
async function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

/**
 * Generates a JWT token for the user/password combination and returns it
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
async function generateToken(username, password) {
    //console.log('Generating token for ' + username);
    const token = jwt.sign({ username: username, password: password }, process.env.JWT_SECRET, { expiresIn: '8h' });
    //console.log('Generated token: ' + token);
    return token;
}

// Export as a module
module.exports = {
    hashPassword,
    checkPassword,
    generateToken
};