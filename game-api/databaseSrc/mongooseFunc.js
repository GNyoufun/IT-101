const Schema = require('./mongooseSchema.js');
const {
  review,
  userid
} = require('./mongooseSchema.js');
const precent = 100;

/**
 * Provide the search query parameters to retrieve documents
 * @param  {model}  collect the collection model name 
 * @param  {object} finddocs a list of quaries
 * @example { header : matches }
 */
async function retrieveCollection (collect, id, finddocs, options) {
  let docs;
    finddocs.UserId = id;
  try {
    docs = await collect.find(finddocs, options).lean();
  } catch (err) {
    console.error(err);
  }
  return docs;
}

/**
 * Provide a list of schemas as parameters to insert into collections
 * @param  {model}  collect the collection model name 
 * @param  {[object]} docs a list of schemas to be inserted into collections
 * @example { header: value }
 */
function insertCollection(collect, docs) {
    collect.collection.insertMany(docs, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Multiple documents inserted to Collection');
        }
    });
}

/**
 * Provide a list of users to insert into the database
 * @param {[object]} users a list of users
 */
function insertUser(users) {
    try{
        insertCollection(userid, users); 
        console.log('Multiple documents inserted to Collection');
    }catch(e){
        return console.error(e);
    }
}


/**
 * Provide the search query parameters, and the changable as changes to apply
 * @param  {model}  collect the collection model name 
 * @param  {object} finddocs a list of search queries
 * @example { header : matches } 
 * @param  {object} changes a list of changable value for the given field
 * @example { header : changes }
 */
async function updateReivew (collect, finddocs, changes) {
  let updated;
  try {
    updated = await collect.collection.updateMany(finddocs, changes);
    console.log('Updated selected documents in the collection');
  } catch (err) {
    console.error(err);
  }
  return updated;
}

/**
 * Updates the token for a given user
 * @param {*} query the query to find the user
 * @param {*} token the new token for the user
 */
function updateUserToken(query, token){
    userid.findOneAndUpdate(query, {Token: token}, function(err, doc){
        if (err) {
            return console.error(err);
        } else {
            try {
                console.log(doc);
            }catch (err) {
                console.error(err);
            }
        }
    });
}


/**
 * Provide the search query parameters, and the changable as changes to apply
 * @param  {model}  collect the collection model name 
 * @param  {object} finddocs a list of search queries
 * @example { header : matches } 
 * @param  {object} changes a list of changable value for the given field
 * @example { header : changes }
 * @param  {[Boolean]} returnDoc determine which versions of the document 
 *                               to return, replaced document when true
 *                               older versions of document when false
 *                               It is defaulted to false
 */
function FindReplaceCollection(collect, id, finddocs, changes, returnedDoc = false) {
    finddocs.UserId = id;
    collect.collection.findOneAndReplace(finddocs, changes,
        { returnNewDocument: returnedDoc }, function (err, doc) {
            if (err) {
                return console.error(err);
            } else {
                try {
                    console.log(doc);
                }catch (err) {
                    console.error(err);
                }
            }
        });
}

/**
 * Provide the search query parameters, and remove from the collection
 * @param  {model}  collect the collection model name 
 * @param  {object} reviews a list of queries
 */
async function deleteCollection (collect, id, finddocs) {
    finddocs.UserId = id;
  let deleted;
  try {
    deleted = await collect.collection.deleteMany(docs);
    console.log('Removed selected documents in the collection ');
  } catch (err) {
    console.error(err);
  }
  return deleted.deletedCount;
}


/**
 * Find and list the games that the User had recoreded so far 
 * @param {int} id The User ID registered in the server 
 * @returns The games that are listed under the specified User
 */
async function extractGames(id){
    const users = await userid.findById(id).lean();
    if (users == null){
        return null;
    }
    const game = users.Games;
    return game;
}


/**
 * Find and list the teammate that the User has recorded in the specified game
 * @param {String} GameTitle The game title of the documents that wished to find
 * @param {Int}    id The User ID registered in the server
 * @returns The list of Teammate in the specified Game that belong to the user
 */
async function extractTeam(GameTitle, id) {
    const games = await review.find({Title: GameTitle, UserId: id}).lean();
    let teammate = [];
    
    for (let i = 0; i < games.length; i++) {
        let team = games[i].Team
        teammate.push(...team);
    }

    const uniqueTeammate = teammate.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === teammate.findIndex(obj => {
          return JSON.stringify(obj) === _value;
        });
      });
    
    return uniqueTeammate;
}


/**
 * 
 * @param {*} str 
 * @param {*} department 
 * @param {*} time 
 */
function logging (str, department, time) {
  const logs = time + ' - '; + department + " - " + str + "\n";
}

/**
 * Calculate the win rate of the user with different teammate in specified game
 * @param {String}   GameTitle       The title of the game that wish to calculated from
 * @param {Int}      id              The Users ID registered in the server
 * @param {DateTime}      [Time = Date()] The DateTime that the documents is recorded
 * @returns Return an array of objects of item specified in gameIDSchema and 
 *              the number of wins, losts and the win rate with that teammate 
 */
async function TeamWinRate (GameTitle, id, Time = new Date()) {
  const win = await review.find({
    Title: GameTitle,
    UserId: id, Result: 'Win',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    UserId: id, Result: 'Lost',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const players = [];

    calcResult(players, win, "win");
    calcResult(players, lost, "lost");

  for (let i = 0; i < players.length; i++) {
    const winResult = players[i].win;
    const total = players[i].total;
    players[i].winRate = (winResult / total) * precent;
  }

    return players 
}


/**
 * Calculate the user's win rate in general for the specified game
 * @param {String}   GameTitle       The title of the game that wish to calculated from
 * @param {Int}      id              The Users ID registered in the server
 * @param {DateTime} [Time = Date()] The DateTime that the documents is recorded
 * @returns The win rate of the specified game
 */
async function gameWinRate (GameTitle, id, Time = new Date()) {
  const win = await review.find({
    Title: GameTitle,
    UserId: id, Result: 'Win',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    UserId: id, Result: 'Lost',
    Date: { $lt: ISODate(Time) }
  }).lean();

    let rate = (win.length / (win.length + lost.length)) * precent;

    return rate 
}


/**
 * Calculate the averge time the user spend in each raid for the specified game
 * @param {String}   GameTitle       The title of the game that wish to calculated from
 * @param {Int}      id              The Users ID registered in the server
 * @param {DateTime} [Time = Date()] The DateTime that the documents is recorded
 * @returns The average time for the specified game
 */
async function averageTime(GameTitle, id, result = "both"){
    let total_time = 0;
    let num_review = 0;

  const document = await review.find({
    Title: GameTitle,
    UserId: id, Result: result,
    Date: { $lt: ISODate(Time) }
  }).lean();
  if (result === 'both') {
    const document = await review.find({
      Title: GameTitle,UserId: id, 
      Date: { $lt: ISODate(Time) }
    }).lean();
  }

    for (let i = 0; i < document.length; i++){
        total_time += document[i].Durations;
        num_review++;
    }

    // console.log(players);
    return total_time / num_review;
};


/**
 * Calculate the win / lost rate for each difficulty with the specified game
 * @param {String}   GameTitle       The title of the game that wish to calculated from
 * @param {Int}      id              The Users ID registered in the server
 * @param {DateTime} [Time = Date()] The DateTime that the documents is recorded
 * @return The array of object with each difficulty and the its win / lost rate
 *              and the number of win / lost and total value 
 */
async function averageDifficulty (GameTitle, id, Time = new Date()) {
  const win = await review.find({
    Title: GameTitle,
    UserId: id, Result: 'Win',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    UserId: id, Result: 'Lost',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const difficult = [];
    let totalDiff = 0;

    calcAverageDiff(difficult, win, "win");
    calcAverageDiff(difficult, lost, "lost");

    for(let i = 0; i < difficult.length; i++){
        totalDiff += difficult[i].total;
    }

    for(let i = 0; i < difficult.length; i++){
        let num_win_diff = difficult[i].win;
        let num_lost_diff = difficult[i].lost;
        let total = difficult[i].total;
        difficult[i].winRate = (num_win_diff / total) * precent;
        difficult[i].lostRate = (num_lost_diff / total) * precent;
        difficult[i].totalRate = (total / totalDiff) * precent;
    }
    return difficulty;
};


/**
 * Calculates the win / lost rate for each ratings 
 * @param {String}   GameTitle       The title of the game that wish to calculated from
 * @param {Int}      id              The Users ID registered in the server
 * @param {DateTime} [Time = Date()] The DateTime that the documents is recorded
 * @returns the array of objects with rating and its win / lost rate values
 */
async function averageRating (GameTitle, id, Time = new Date()) {
  const documents = await review.find({
    Title: GameTitle,
    UserId: id, Result: 'Win',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    UserId: id, Result: 'Lost',
    Date: { $lt: ISODate(Time) }
  }).lean();

    const rate = [];
    let totalRating = 0;

    calcAverageRate(rate, win, "win");
    calcAverageRate(rate, lost, "lost");

    for(let i = 0; i < rate.length; i++){
        totalRating += rate[i].total;
    }

    for(let i = 0; i < rate.length; i++){
        let num_win_rating = rate[i].win;
        let num_lost_rating = rate[i].lost;
        let total = rate[i].total;
        rate[i].winRate = (num_win_rating / total) * precent;
        rate[i].lostRate = (num_lost_rating / total) * precent;
        rate[i].totalRate = (total / totalRating) * precent;
    }
    return rate;
};

async function midDifficulty(GameTitle, id, Time = new Date()){
    let diffArr = await averageDifficulty(GameTitle, id, Time);
    let mid = [];

    for (let i = 0; i < diff.length; i++) {
        let diff = diffArr[i].difficulty;
        let total = diff[i].total;
        let arr = Array(total).fill(diff);
        mid.push(arr);
    }

    return midian(mid);

}

async function midRating(GameTitle, id, Time = new Date()){
    let rateArr = await averageRating(GameTitle, id, Time);
    let mid = [];

    for (let i = 0; i < diff.length; i++) {
        let rate = rateArr[i].Rating;
        let total = rate[i].total;
        let arr = Array(total).fill(rate);
        mid.push(arr);
    }

    return midian(mid);

}

function midian(arr){
    if(arr.length === 0) {
        throw new Error("Empty Array");
    }

    arr.sort(function(a,b){
        return a-b;
    });

    let half = Math.floor(arr.length / 2);
    
    if (arr.length % 2){
        return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2.0;
}

function calcResult (players, documents, result) {
  const winPreset = preset(result)[0];
  const lostPreset = preset(result)[1];

    for (let i = 0; i < documents.length; i++) {
        let team = documents[i].Team;
        for (let j = 0; j < team.length; j++) {
            let gameid = team[j].GameID;
            let playerID;

            if ((playerID =
                            players.findIndex(obj => obj.GameID === gameid)) !== -1) {
                players[playerID][result]++;
                players[playerID][total]++;
            } else {
                players.push({
                GameID: gameid,
                total: 1,
                win: winPreset,
                lost: lostPreset
                });
            }
        }
    }
}


/**
 * Helper function for averageDifficulty, extract the difficulty from the object 
 * array and calculate the win rate 
 * @param {list}     collection A list of record 
 * @param {[object]} documents the object array that contains the review 
 * @param {String}   result The result of the raid 
 */
function calcAverageDiff(collection, documents, result){
    const win_preset = preset(result)[0]; 
    const lost_preset = preset(result)[1];

    for (let i = 0; i < documents.length; i++) {
        let diff = documents[i].Difficulty;
        let diffID;

        if ((diffID =
                collection.findIndex(obj => obj.Difficulty === diff)) !== -1) {
        collection[diffID][result]++;
        collection[diffID][total]++;
        } else {
        collection.push({
            Difficulty: diff,
            total: 1,
            win: winPreset,
            lost: lostPreset
        });
        }
    }
}


/**
 * Helper function for averageRating, extract the difficulty
 * or rating from the object array and calculate the win rate 
 * @param {list}     collection A list of record 
 * @param {[object]} documents the object array that contains the review 
 * @param {String}   result The result of the raid 
*/
function calcAverageRate(collection, documents, result){
    const win_preset = preset(result)[0]; 
    const lost_preset = preset(result)[1];

    for (let i = 0; i < documents.length; i++) {
        let rate = documents[i].Rating;
        let rateID;

        if ((rateID = 
            collection.findIndex((obj => obj.Rating === rate))) != -1){
                collection[rateID][result]++;
                collection[rateID][total]++;
        }else{
            collection.push({Rating: rate, total: 1, win: win_preset, 
                            lost: lost_preset});
        }
    }
}



/**
 * Set the win and lost preset base on the result 
 * @param {*} result 
 * @returns 
 */
function preset(result) {
    const win_preset = 0; 

    if (result == "win"){
        win_preset = 1; 
    }
    
    const lost_preset = 1 - win_preset;

  return [winPreset, lostPreset];
}


module.exports = {
  retrieveCollection,
  insertCollection,
  updateCollection,
  FindReplaceCollection,
  deleteCollection,

  TeamWinRate,
  gameWinRate,
  averageTime,
  averageDifficulty,
  averageRating,
  extractGames,
  extractTeam,

  insertUser,
  updateUserToken,
};

// require('./mongodb_trial.js');
