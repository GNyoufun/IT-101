const Schema = require('./mongooseSchema.js');
// const gameID = Schema.gameID;
const review = Schema.review;

/**
 * Provide the search query parameters to retrieve documents
 * @param  {[list]} findItem a list of quaries
 * @example{ header : matches }
 * @callback reviews that retrieves the results
 */
function retrieveReview(findItem) {
    try {
        const win = await review.find(findItem).lean();
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Provide a list of schemas as parameters to insert into collections
 * @param  {[list]} reviews a list of schemas
 * @example{ header : matches }
 */
function insertReivew(reviews) {
    review.collection.insertMany(reviews, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Multiple documents inserted to Collection');
        }
    });
}

/**
 * Provide the search query parameters, and the changable as changes to apply
 * @param  {[list]} findItem a list of search queries
 * @example{ header : matches } 
 * @param  {[list]} changes a list of changable value for the given field
 * @example{ header : changes }
 */
function updateReivew(findItem, changes) {
    review.collection.updateMany({ findItem }, { changes }, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Updated selected documents in the collection ');
        }
    });
}

/**
 * Provide the search query parameters, and the changable as changes to apply
 * @param  {[list]} findItem a list of search queries
 * @example{ header : matches } 
 * @param  {[list]} changes a list of changable value for the given field
 * @example{ header : changes }
 * @param  {[Boolean]} returnDoc determine which versions of the document 
 *                        to return, replaced document when true
 *                        older versions of document when false
 *                        It is defaulted to false
 */
function FindReplaceReivew(findItem, changes, returnedDoc = false) {
    review.collection.findOneAndReplace({ findItem }, { changes },
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
 * @param  {[list]} reviews a list of queries
 */
function deleteReivew(reviews) {
    review.collection.deleteMany(reviews, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Removed selected documents in the collection ');
        }
    });
}


async function TeamWinRate(GameTitle, Time = new Date()){
    const win = await review.find({Title: GameTitle, Result: 'Win', 
                                        Date: { $lt:ISODate(Time) }}).lean();
    const lost = await review.find({Title: GameTitle, Result: 'Lost', 
                                        Date: { $lt:ISODate(Time) }}).lean();
    const players = [];

    calcResult(players, win, "win");
    calcResult(players, lost, "lost");

    for(let i = 0; i < players.length; i++){
        let win_result = players[i].win;
        let lost_result = players[i].lost;
        players[i].winRate = win_result / (win_result + lost_result);
    }

    return players 
}

async function gameWinRate(GameTitle, Time = new Date()){
    const win = await review.find({Title: GameTitle, Result: 'Win', 
                                        Date: { $lt:ISODate(Time) }}).lean();
    const lost = await review.find({Title: GameTitle, Result: 'Lost', 
                                        Date: { $lt:ISODate(Time) }}).lean();

    let rate = win.length / (win.length + lost.length);

    // console.log(rate);
    return rate 
}

async function averageTime(GameTitle, result = "both"){
    let total_time = 0;
    let num_review = 0;

    const document = await review.find({Title: GameTitle, Result: result, 
                                        Date: { $lt:ISODate(Time) }}).lean();
    if (result == "both"){
        const document = await review.find({Title: GameTitle, 
                                        Date: { $lt:ISODate(Time) }}).lean();
    }

    for (let i = 0; i < document.length; i++){
        total_time += document[i].Durations;
        num_review++;
    }

    // console.log(players);
    return total_time / num_review;
};

function averageDifficulty(GameTitle, Time = new Date()){
    const win = await review.find({Title: GameTitle, Result: 'Win', 
                                        Date: { $lt:ISODate(Time) }}).lean();
    const lost = await review.find({Title: GameTitle, Result: 'Lost', 
                                        Date: { $lt:ISODate(Time) }}).lean();
    const difficult = [];

    calcDiff(difficult, win, "win");
    calcDiff(difficult, lost, "lost");

    for(let i = 0; i < difficult.length; i++){
        let win_result = difficult[i].win;
        let lost_result = difficult[i].lost;
        difficult[i].winRate = win_result / (win_result + lost_result);
    }
};

function calcResult(players, documents, result){
    const win_preset = 0; 

    if (result == "win"){
        const win_preset = 1; 
    }
    const lost_preset = 1 - win_preset;

    for (let i = 0; i < documents.length; i++) {
        let team = documents[i].Team;
        for (let j = 0; j < team.length; j++) {
            let gameid = team[j].GameID;
            let playerID;

            if ((playerID = 
                    players.findIndex((obj => obj.GameID === gameid))) != -1){
                players[playerID][result]++;
            }else{
                players.push({GameID: gameid, win: win_preset, 
                                lost: lost_preset});
            }
        }
    }
}

function calcDiff(difficult, documents, result){
    const win_preset = 0; 

    if (result == "win"){
        const win_preset = 1; 
    }
    const lost_preset = 1 - win_preset;

    for (let i = 0; i < documents.length; i++) {
        let diff = documents[i].Difficulty;
        let diffID;

        if ((diffID = 
                difficult.findIndex((obj => obj.Difficulty === diff))) != -1){
            difficult[playerID][result]++;
        }else{
            difficult.push({Difficulty: diff, win: win_preset, 
                            lost: lost_preset});
        }
    }
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
    averageDifficulty

};

require('./mongodb_trial.js');
