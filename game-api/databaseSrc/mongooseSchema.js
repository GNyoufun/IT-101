const mongoose = require('mongoose');
const connectDB = require('./mongoose.js');
const { Schema } = mongoose;

// connect to MongoDB
connectDB();
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});



/**
 * Game Schema that stores the Title of the game and the type of the game 
 * @inner GameTitle : The title of the game
 * @inner GameType : The type of the game
 */
const GameTitleSchema = new Schema({
    GameTitle: String,
    GameType: String
})


/**
 * Basic Player ID schema, stores:
 * @inner GameID : Player's in game ID
 * @inner Level : Player's in game leve
 */
const gameIDSchema = new Schema({
    GameID: String,
    Level: Number
});

/**
 * Basic WebApp User schema, stores:
 * @inner UserId : stores the user ID, e.g. email address
 * @inner Games : a list of games that the user owns and stored 
 */
 const userSchema = new Schema({
    UserId: String, 
    Games: [GameTitleSchema]
})


/**
 * Basic Raid Reivew schema, stores:
 * @inner Title : Player's in game ID
 * @inner userId : User ID 
 * @inner Date : Player's in game level
 * @inner Team : An array of gameIDSchema which contains the team member of the 
 *                doucmented Raid
 * @inner Durations : Time span for the raid in minutes,
 * @inner Result : the outcome of the Raid, with default value Draw
 * @inner comments : general comments for the Raid 
 */
const reviewSchema = new Schema({
    Title: String, 
    userId: String, 
    Date: { type: Date, default: Date.now },
    // Team: [{ type: Schema.Types.ObjectId, ref: gameIDSchema }],
    Team: [gameIDSchema],
    Durations: Number, 
    Result: { 
        type: String,
        enum: ["Win", "Draw", "Lost"],
        default: 'Draw' },
    Difficulty: Number, // 1 - 10 
    comments: { type: String, default: 'No Comment' }
});

const review = new mongoose.model('review', reviewSchema, 'Review');
const userid = new mongoose.model('userid', userSchema, "UserID");

module.exports = {
    review,
    userid
};

require('./mongooseFunc.js');
