const Schema = require('./mongooseSchema.js');
const{
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
async function retrieveReview(collect, finddocs) {
    let docs;
    try {
         docs = await collect.find(finddocs).lean();
    }
    catch (err) {
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
function insertReivew(collect, reviews) {
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
function updateReivew(collect, finddocs, changes) {
    collect.collection.updateMany({ finddocs }, { changes }, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Updated selected documents in the collection ');
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
 * @param  {[Boolean]} returnDoc determine which versions of the document 
 *                               to return, replaced document when true
 *                               older versions of document when false
 *                               It is defaulted to false
 */
function FindReplaceReivew(collect, finddocs, changes, returnedDoc = false) {
    collect.collection.findOneAndReplace({ finddocs }, { changes },
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
 * @param collect the collection model name 
 * @param  {[list]} reviews a list of queries
 */
function deleteReivew(collect, docs) {
    collect.collection.deleteMany(docs, function (err) {
        if (err) {
            return console.error(err);
        } else {
            console.log('Removed selected documents in the collection ');
        }
    });
}

async function extractGames(id){
    const users = await userid.findById(id).lean();
    const game = users.Games;
    return game;
}

async function extractTeam(){
    const games = await review.find({Title: GameTitle}).lean();


    
}

function logging(str, department, time){
    let logs = time + " - "
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
        let total = players[i].total;
        players[i].winRate = (win_result / total) * precent;
    }

    return players 
}

async function gameWinRate(GameTitle, Time = new Date()){
    const win = await review.find({Title: GameTitle, Result: 'Win', 
                                        Date: { $lt:ISODate(Time) }}).lean();
    const lost = await review.find({Title: GameTitle, Result: 'Lost', 
                                        Date: { $lt:ISODate(Time) }}).lean();

    let rate = win.length / (win.length + lost.length);

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

async function averageDifficulty(GameTitle, Time = new Date()){
    const win = await review.find({Title: GameTitle, Result: 'Win', 
                                        Date: { $lt:ISODate(Time) }}).lean();
    const lost = await review.find({Title: GameTitle, Result: 'Lost', 
                                        Date: { $lt:ISODate(Time) }}).lean();
    const difficult = [];

    calcAverage(difficult, win, "win", Difficulty);
    calcAverage(difficult, lost, "lost", Difficulty);

    for(let i = 0; i < difficult.length; i++){
        let num_win_diff = difficult[i].win;
        let num_lost_diff = difficult[i].lost;
        let total = difficult[i].total;
        difficult[i].winRate = (num_win_diff / total) * precent;
        difficult[i].lostRate = (num_lost_diff / total) * precent;
    }
};

async function averageRating(GameTitle, Time = new Date()){
    const documents = await review.find({Title: GameTitle, Result: 'Win', 
                                        Date: { $lt:ISODate(Time) }}).lean();
    const lost = await review.find({Title: GameTitle, Result: 'Lost', 
                                        Date: { $lt:ISODate(Time) }}).lean();

    const rate = [];

    calcAverage(rate, win, "win", Rating);
    calcAverage(rate, lost, "lost", Rating);

    for(let i = 0; i < rate.length; i++){
        let num_win_diff = rate[i].win;
        let num_lost_diff = rate[i].lost;
        let total = rate[i].total;
        rate[i].winRate = (num_win_diff / total) * precent;
        rate[i].lostRate = (num_lost_diff / total) * precent;
    }

};

function calcResult(players, documents, result){
    const win_preset = preset(result)[0]; 
    const lost_preset = preset(result)[1];

    for (let i = 0; i < documents.length; i++) {
        let team = documents[i].Team;
        for (let j = 0; j < team.length; j++) {
            let gameid = team[j].GameID;
            let playerID;

            if ((playerID = 
                    players.findIndex((obj => obj.GameID === gameid))) != -1){
                players[playerID][result]++;
                players[playerID][total]++;
            }else{
                players.push({GameID: gameid, total: 1, win: win_preset, 
                                lost: lost_preset});
            }
        }
    }
}

function calcAverage(collection, documents, result, items){
    const win_preset = preset(result)[0]; 
    const lost_preset = preset(result)[1];

    for (let i = 0; i < documents.length; i++) {
        let diff = documents[i].items;
        let diffID;

        if ((diffID = 
            collection.findIndex((obj => obj.Difficulty === diff))) != -1){
                collection[diffID][result]++;
                collection[diffID][total]++;
        }else{
            collection.push({Difficulty: diff, total: 1, win: win_preset, 
                            lost: lost_preset});
        }
    }
}

function preset(result) {
    const win_preset = 0; 

    if (result == "win"){
        win_preset = 1; 
    }
    
    const lost_preset = 1 - win_preset;

    return [win_preset, lost_preset]
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

