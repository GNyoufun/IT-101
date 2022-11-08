const Schema = require('./mongooseSchema.js');
const {
  review,
  userid
} = require('./mongooseSchema.js');
const {
  deleteAWS
} = require('../aws/awsStorage.js')
const precent = 100;

/**
 * Provide the search query parameters to retrieve documents
 * @param {model}  collect the collection model name 
 * @param {object} finddocs a list of quaries
 * @param {String} options mongoose option/filter 
 * @example { header : matches }
 */
async function retrieveCollection (collect, finddocs, options) {
  let docs;
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
async function insertCollection (collect, docs) {
  let inserted;
  try {
    inserted = await collect.collection.insertMany(docs);
    console.log('Multiple documents inserted to Collection');
  } catch (err) {
    console.error(err);
    return err;
  }
  return inserted.insertedIds;
}

/**
 * Provide the search query parameters, and the changable as changes to apply
 * @param  {model}  collect the collection model name 
 * @param  {object} finddocs a list of search queries
 * @example { header : matches } 
 * @param  {object} changes a list of changable value for the given field
 * @example { header : changes }
 */
 async function updateCollection (collect, finddocs, changes) {
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
function FindReplaceCollection (collect, finddocs, changes, returnedDoc = false) {
  collect.collection.findOneAndReplace( finddocs, changes,
    { returnNewDocument: returnedDoc }, function (err, doc) {
      if (err) {
        return console.error(err);
      } else {
        try {
          console.log(doc);
        } catch (err) {
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
async function deleteCollection (collect, docs) {
  let deleted;
  try {
    try{
      let tobeDeleted = await retrieveCollection(collect, docs);
      for(let i = 0; i < tobeDeleted.length; i++){
        let images = tobeDeleted[i].ImageURL
        await deleteAWS(images)
      }
      
    }catch(err){
      console.error(err);
    }

    deleted = await collect.collection.deleteMany(docs);
    if (deleted.deletedCount === 0) {
      console.log('No documents found');
    } else {
      console.log('Removed selected documents in the collection ');
    }
  } catch (err) {
    console.error(err);
  }
  return deleted.deletedCount;
}

/**
 * Provide a list of users to insert into the database
 * @param {[object]} users a list of users
 */
async function insertUser(user) {
  // Password should already be hashed before given here
  // Check that password and username are given
  if (!user.UserPassword || !user.UserName) {
    console.warn('Error: Password or Username not given');
    return;
  }
  let result = await userid.collection.insertOne(user);
  console.log('Inserted user ' + result.insertedId +' into collection');
  return result.insertedId;
}

/**
 * Returns the result of finding a single user by id
 * @param {ObjectId} id 
 * @returns the user with the given id
 */
async function retrieveUserById(id){
  const user = await userid.findById(id).lean();
  return user;
}

/**
 * Updates the token for a given user
 * @param {*} query the query to find the user
 * @param {*} token the new token for the user
 */
function updateUserToken(id, token){
    userid.findOneAndUpdate({_id: id}, {"Token": token}, function(err, doc){
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
 * @param {ObjectId}    id The User ID registered in the database
 * @returns The list of Teammate in the specified Game that belong to the user
 */
async function extractTeam(GameTitle, id) {
  const games = await review.find({Title: GameTitle, UserId: id}).lean();
  const uniqueIds = new Set();
  let teammate = [];
  
  for (let i = 0; i < games.length; i++) {
    let team = games[i].Team
    teammate.push(...team);
  }

  teammate.sort(function(a, b) {          
       if (a.InGameID === b.InGameID) {
          return b.Level - a.Level;
       }
       return a.InGameID > b.InGameID ? 1 : -1;
    });
  
  const unique = teammate.filter(element => {
    const isDuplicate = uniqueIds.has(element.InGameID);
    uniqueIds.add(element.InGameID);
    if (!isDuplicate) {
      return true;
    }
    return false;
  });
  
  return unique;
}

/**
 * Retrieve raid review by the user ID and the teammate who the user played with 
 * @param {String} GameTitle The title of the game that the user played with the 
 *                        user specified teammate name 
 * @param {ObjectId} id The user Id registered in the database 
 * @param {Object} teammate The object contained teammate name and level 
 * @returns A list of raid review where the teammate is in 
 */
async function retrieveByTeammate(GameTitle, id, teammate){
  const games = await review.find({Title: GameTitle, UserId: id}).lean();
  let gameID = teammate.InGameID;
  let level = teammate.Level;
  let raidReview = [];

  for (let i = 0; i < games.length; i++) {
    let team = games[i].Team;
    console.log(team)
    if (team.some(e => e.InGameID === gameID && e.Level === level)){
      raidReview.push(games[i])
    }
  }
  return raidReview;
}

/**
 * Get the last N value from the review model sorted by descending Date
 * @param {Int} n the last N value to retrieve
 * @param {objectId} id The user Id registered in the database 
 * @returns a array of objects
 */
async function retrieveLastN (n, id) {
  let docs = await retrieveCollection(review, {UserId: id});
  
  docs.sort(function(a,b){
    return new Date(b.Date) - new Date(a.Date);
  });
  
  return docs.slice(0, n);
}



/**
 * Calculate the win rate of the user with different teammate in specified game
 * @param {String}   GameTitle       The title of the game that wish to 
 *                                      calculated from
 * @param {ObjectId}      id              The Users ID registered in the server
 * @param {DateTime} [Time = Date()] The DateTime that the documents is recorded
 * @returns Return an array of objects of item specified in gameIDSchema and 
 *              the number of wins, losts and the win rate with that teammate 
 */
async function TeamWinRate (GameTitle, id, Time = new Date()) {
  const win = await review.find({
    Title: GameTitle,
    UserId: id, 
    Result: 'Win',
    Date: { $lte: Time }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    UserId: id, 
    Result: 'Lost',
    Date: { $lte: Time }
  }).lean();
  const draw = await review.find({
    Title: GameTitle,
    UserId: id, 
    Result: 'Draw',
    Date: { $lte: Time }
  }).lean();
  const players = [];

  calcResult(players, win, 'win');
  calcResult(players, lost, 'lost');
  calcResult(players, draw, 'draw');

  for (let i = 0; i < players.length; i++) {
    const winResult = players[i].win;
    const total = players[i].total;
    players[i].winRate = (winResult / total) * precent;
  }

  return players;
}

/**
 * Calculate the user's win rate in general for the specified game
 * @param {String}   GameTitle       The title of the game that wish to calculated from
 * @param {ObjectId}      id         The Users ID registered in the server
 * @param {DateTime} [Time = Date()] The DateTime that the documents is recorded
 * @returns The win rate of the specified game
 */
async function gameWinRate (GameTitle, id, Time = new Date()) {
  const win = await review.find({
    Title: GameTitle,
    UserId: id, 
    Result: 'Win',
    Date: { $lte: Time }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    UserId: id, 
    Result: 'Lost',
    Date: { $lte: Time }
  }).lean();
  const draw = await review.find({
    Title: GameTitle,
    UserId: id, 
    Result: 'Draw',
    Date: { $lte: Time }
  }).lean();

  let rate = (win.length / (win.length + lost.length + draw.length)) * precent;

  return rate 
}

/**
 * Extract result from review and calcuate win/lost/draw rate by games in last 
 * 7 days 
 * @param {ObjectId} id The Users ID registered in the server
 * @returns a list of objects contain rate data 
 */
async function bestWinRate(id){
  let today = new Date(new Date().setUTCHours(0,0,0,0));
  let svnDay = new Date((today - 7 * 24 * 60 * 60 * 1000));
  let rates = []

  let document = await review.find({
    UserId: id, 
    Date: { 
      $gte: svnDay,
      $lte: today}
  }).lean();

  for (let i = 0; i < document.length; i++) {
    let gameTitle = document[i].Title;
    let result = document[i].Result
    let title;

    if ((title =
              rates.findIndex(obj => obj.Title === gameTitle)) !== -1) {
        rates[title][result]++;
        rates[title]["Total"]++;
    } else {
      let obj = {
        Title: gameTitle,
        Total: 1,
        Win: 0,
        Lost: 0,
        Draw: 0
      }
      obj[result]++;

      rates.push(obj);
    }
  }

  for (let i = 0; i < rates.length; i++) {
    const winResult = rates[i].Win;
    const lostResult = rates[i].Lost;
    const drawResult = rates[i].Draw;
    const total = rates[i].Total;
    rates[i].winRate = (winResult / total) * precent;
    rates[i].lostRate = (lostResult / total) * precent;
    rates[i].drawRate = (drawResult / total) * precent;
  }

  let sorted = rates.sort((a, b) => b.winRate - a.winRate);

  return sorted;
}

/**
 * Extract and get the time duration for all game for past seven days 
 * @param {ObjectId} id The Users ID registered in the server
 * @returns a list of objects of the time related data
 */
 async function totalTime(id){
  let today = new Date(new Date().setUTCHours(0,0,0,0));
  let svnDay = new Date((today - 7 * 24 * 60 * 60 * 1000));
  let durations = []

  let document = await review.find({
    UserId: id, 
    Date: { 
      $gte: svnDay,
      $lte: today }
  }).lean();

  for (let i = 0; i < document.length; i++) {
    let gameTitle = document[i].Title;
    let duration = document[i].Durations
    let date = document[i].Date
    let title;

    let difference = Math.ceil((today - date) / (24 * 60 * 60 * 1000))
    let day = "day" + difference.toString();

    if ((title =
              durations.findIndex(obj => obj.Title === gameTitle)) !== -1) {
        durations[title]["totalTime"] += duration;
        durations[title][day] += duration;
    } else {
      let obj = {
        Title: gameTitle,
        totalTime: duration,
        day0: 0,
        day1: 0,
        day2: 0,
        day3: 0,
        day4: 0,
        day5: 0,
        day6: 0,
        day7: 0
      }
      obj[day] = duration;

      durations.push(obj);
    }
  }

  return durations;
}

/**
 * Get the total time for past seven days in daily format
 * @param {ObjectId} id The UserID registered in the server 
 * @returns  a list of objects of the time related data
 */
async function totalTimeByDay(id){
  let timeArr = await totalTime(id);
  let daily = {}

  for (let i = 0; i < timeArr.length; i++){
    for(let key in timeArr[i]){
      let curr = timeArr[i][key]

      if (typeof curr != 'string' && !(curr instanceof String)){
        if (i === 0){
          daily[key] = curr;
        }else{
          daily[key] += curr;
        }
      }
    }
  }
  return daily;
}

/**
 * Calculate the win, lost and draw rate for each difficulty / Rating with the 
 * specified game
 * @param {String}   GameTitle The title of the game that the rate to 
 *                                calculated from
 * @param {ObjectId} id        The Users ID registered in the server
 * @param {String}   target    The key to which be calculated
 * @param {DateTime} [Time = new Date()] The DateTime that the documents 
 *                                          is recorded
 * @returns The array of object with each key and the its win, lost and draw 
 *            rate and the number of win, lost, draw and total value 
 */
async function average(GameTitle, id, target, Time = new Date()) {
  const win = await review.find({
    Title: GameTitle,
    UserId: id, 
    Result: 'Win',
    Date: { $lte: Time }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    UserId: id, 
    Result: 'Lost',
    Date: { $lte: Time }
  }).lean();
  const draw = await review.find({
    Title: GameTitle,
    UserId: id, 
    Result: 'Draw',
    Date: { $lte: Time }
  }).lean();

  const avrArr = [];
  let totalAvr = 0;

  calcAverage(avrArr, win, "win", target);
  calcAverage(avrArr, lost, "lost", target);
  calcAverage(avrArr, draw, "draw", target);

  for(let i = 0; i < avrArr.length; i++){
    totalAvr += avrArr[i].total;
  }

  for(let i = 0; i < avrArr.length; i++){
    let num_win = avrArr[i].win;
    let num_lost = avrArr[i].lost;
    let num_draw = avrArr[i].draw;
    let total = avrArr[i].total;
    avrArr[i].winRate = (num_win / total) * precent;
    avrArr[i].lostRate = (num_lost / total) * precent;
    avrArr[i].drawRate = (num_draw / total) * precent;
    avrArr[i].totalRate = (total / totalAvr) * precent;
  }
  return avrArr;
};

/** 
 * Helper function for extract the data given the reviews as documents  
 * @param {[Object]} players A list of players extracted to be stored 
 * @param {[Object]} documents The object arraytaht containsthe reviews
 * @param {String}   result The result of the review 
 */
function calcResult (players, documents, result) {
  const winPreset = preset(result)[0];
  const lostPreset = preset(result)[1];
  const drawPreset = preset(result)[1];

  for (let i = 0; i < documents.length; i++) {
    const team = documents[i].Team;
    for (let j = 0; j < team.length; j++) {
      const gameid = team[j].InGameID;
      let playerID;

      if ((playerID =
                    players.findIndex(obj => obj.GameID === gameid)) !== -1) {
        players[playerID][result]++;
        players[playerID]["total"]++;
      } else {
        players.push({
          InGameID: gameid,
          total: 1,
          win: winPreset,
          lost: lostPreset,
          draw: drawPreset
        });
      }
    }
  }
}

/**
 * Helper function for average, given the target key, and extract the target 
 * value from the object 
 * @param {[Object]} collection A list of record 
 * @param {[object]} documents the object array that contains the review 
 * @param {String}   result The result of the raid 
 * @param {String}   target The target key from the review
 */
 function calcAverage(collection, documents, result, target){
  const winPreset = preset(result)[0];
  const lostPreset = preset(result)[1];
  const drawPreset = preset(result)[1];

  for (let i = 0; i < documents.length; i++) {
    let data = documents[i][target];
    let dataID;

    if ((dataID =
            collection.findIndex(obj => obj[target] === data)) !== -1) {
      collection[dataID][result]++;
      collection[dataID]["total"]++;
    } else {
      collection.push({
        [target]: data,
        total: 1,
        win: winPreset,
        lost: lostPreset,
        draw: drawPreset
      });
    }
  }
}

/**
 * Gets the midian of the Diffculty/Rating array
 * @param {String} GameTitle The game title of the review to calculate from  
 * @param {ObjectId} id The user ID recorded in the server  
 * @param {String} target    The key to which be calculated 
 * @param {*} Time 
 * @returns 
 */
async function median(GameTitle, id, target, Time = new Date()){
  let averageArr = await average(GameTitle, id, target, Time);
  let mid = [];

  for (let i = 0; i < averageArr.length; i++) {
    let avr = averageArr[i][target];
    let total = averageArr[i]["total"];
    let arr = Array(total).fill(avr);
    mid.push(...arr);
  }

  if(mid.length === 0) {
    throw new Error("Empty Array");
  }

  mid.sort((a, b) => a - b);
  
  let half = Math.floor(mid.length / 2);
  
  if ((mid.length % 2) === 0) {
    return (mid[half - 1] + mid[half]) / 2.0;
  }

  return mid[half];
};


/**
 * Set the win and lost preset base on the result 
 * @param {String} result 
 * @returns a tuple of win and lost presets 
 */
function preset (result) {
  let winPreset = 0;
  let lostPreset = 0;
  
  if (result === 'win') {
    winPreset = 1;
  }else if (result === 'lost') {
    lostPreset = 1;
  }
  
  let drawPreset = 1 - winPreset - lostPreset;

  return [winPreset, lostPreset, drawPreset];
}

module.exports = {
  retrieveCollection,
  insertCollection,
  updateCollection,
  FindReplaceCollection,
  deleteCollection,
  
  insertUser,
  updateUserToken,
  retrieveUserById,
  retrieveByTeammate,
  retrieveLastN,
  
  extractGames,
  extractTeam,
  
  TeamWinRate,
  gameWinRate,
  bestWinRate,
  totalTime,
  totalTimeByDay,
  average,
  median
};

require('./mongodb_trial.js');
