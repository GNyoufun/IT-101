const Schema = require('./mongooseSchema.js');
const {
  review,
  userid
} = require('./mongooseSchema.js');
const precent = 100;

/**
 * Provide the search query parameters to retrieve documents
 * @param collect the collection model name
 * @param  {[list]} finddocs a list of quaries
 * @example{ header : matches }
 */
async function retrieveReview (collect, finddocs, options) {
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
 * @param collect the collection model name
 * @param  {[list]} reviews a list of schemas
 * @example{ header : matches }
 */
function insertReivew (collect, reviews) {
  collect.collection.insertMany(reviews, function (err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('Multiple documents inserted to Collection');
    }
  });
}

/**
 * Provide the search query parameters, and the changable as changes to apply
 * @param collect the collection model name
 * @param  {[list]} finddocs a list of search queries
 * @example{ header : matches }
 * @param  {[list]} changes a list of changable value for the given field
 * @example{ header : changes }
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
 * Provide the search query parameters, and the changable as changes to apply
 * @param collect the collection model name
 * @param  {[list]} finddocs a list of search queries
 * @example{ header : matches }
 * @param  {[list]} changes a list of changable value for the given field
 * @example{ header : changes }
 * @param  {[Boolean]} returnDoc determine which versions of the document
 *                               to return, replaced document when true
 *                               older versions of document when false
 *                               It is defaulted to false
 */
function FindReplaceReivew (collect, finddocs, changes, returnedDoc = false) {
  collect.collection.findOneAndReplace({ finddocs }, { changes },
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
 * @param collect the collection model name
 * @param {[list]} reviews a list of queries
 */
async function deleteReivew (collect, docs) {
  let deleted;
  try {
    deleted = await collect.collection.deleteMany(docs);
    console.log('Removed selected documents in the collection ');
  } catch (err) {
    console.error(err);
  }
  return deleted.deletedCount;
}

async function extractGames (id) {
  const users = await userid.findById(id).lean();
  const game = users.Games;
  return game;
}

async function extractTeam () {
  const games = await review.find({ Title: GameTitle }).lean();
}

function logging (str, department, time) {
  const logs = time + ' - ';
}

async function TeamWinRate (GameTitle, Time = new Date()) {
  const win = await review.find({
    Title: GameTitle,
    Result: 'Win',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    Result: 'Lost',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const players = [];

  calcResult(players, win, 'win');
  calcResult(players, lost, 'lost');

  for (let i = 0; i < players.length; i++) {
    const winResult = players[i].win;
    const total = players[i].total;
    players[i].winRate = (winResult / total) * precent;
  }

  return players;
}

async function gameWinRate (GameTitle, Time = new Date()) {
  const win = await review.find({
    Title: GameTitle,
    Result: 'Win',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    Result: 'Lost',
    Date: { $lt: ISODate(Time) }
  }).lean();

  const rate = win.length / (win.length + lost.length);

  return rate;
}

async function averageTime (GameTitle, result = 'both') {
  let totalTime = 0;
  let numReview = 0;

  const document = await review.find({
    Title: GameTitle,
    Result: result,
    Date: { $lt: ISODate(Time) }
  }).lean();
  if (result === 'both') {
    const document = await review.find({
      Title: GameTitle,
      Date: { $lt: ISODate(Time) }
    }).lean();
  }

  for (let i = 0; i < document.length; i++) {
    totalTime += document[i].Durations;
    numReview++;
  }

  // console.log(players);
  return totalTime / numReview;
}

async function averageDifficulty (GameTitle, Time = new Date()) {
  const win = await review.find({
    Title: GameTitle,
    Result: 'Win',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    Result: 'Lost',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const difficult = [];

  calcAverage(difficult, win, 'win', Difficulty);
  calcAverage(difficult, lost, 'lost', Difficulty);

  for (let i = 0; i < difficult.length; i++) {
    const numWinDiff = difficult[i].win;
    const numLostDiff = difficult[i].lost;
    const total = difficult[i].total;
    difficult[i].winRate = (numWinDiff / total) * precent;
    difficult[i].lostRate = (numLostDiff / total) * precent;
  }
}

async function averageRating (GameTitle, Time = new Date()) {
  const documents = await review.find({
    Title: GameTitle,
    Result: 'Win',
    Date: { $lt: ISODate(Time) }
  }).lean();
  const lost = await review.find({
    Title: GameTitle,
    Result: 'Lost',
    Date: { $lt: ISODate(Time) }
  }).lean();

  const rate = [];

  calcAverage(rate, win, 'win', Rating);
  calcAverage(rate, lost, 'lost', Rating);

  for (let i = 0; i < rate.length; i++) {
    const numWinDiff = rate[i].win;
    const numLostDiff = rate[i].lost;
    const total = rate[i].total;
    rate[i].winRate = (numWinDiff / total) * precent;
    rate[i].lostRate = (numLostDiff / total) * precent;
  }
}

function calcResult (players, documents, result) {
  const winPreset = preset(result)[0];
  const lostPreset = preset(result)[1];

  for (let i = 0; i < documents.length; i++) {
    const team = documents[i].Team;
    for (let j = 0; j < team.length; j++) {
      const gameid = team[j].GameID;
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

function calcAverage (collection, documents, result, items) {
  const winPreset = preset(result)[0];
  const lostPreset = preset(result)[1];

  for (let i = 0; i < documents.length; i++) {
    const diff = documents[i].items;
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

function preset (result) {
  const winPreset = 0;

  if (result === 'win') {
    winPreset = 1;
  }

  const lostPreset = 1 - winPreset;

  return [winPreset, lostPreset];
}

module.exports = {
  retrieveReview,
  insertReivew,
  updateReivew,
  FindReplaceReivew,
  deleteReivew,

  TeamWinRate,
  gameWinRate,
  averageTime,
  averageDifficulty,
  averageRating,

  extractGames

};

require('./mongodb_trial.js');
