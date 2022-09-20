const {
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

    extractGames,
    extractTeam

} = require('./mongooseFunc.js');

const{
    review,
    userid
} = require('./mongooseSchema.js');

// Example schemas
const IDLost = [{ GameID: 'GAMER1100', Level: 11 },
             { GameID: 'StromBreaker', Level: 18 },
             { GameID: 'StoryQ', Level: 17}];

const IDS = [{ GameID: 'GAMER1100', Level: 11 },
             { GameID: 'StromBreaker', Level: 18 },
             { GameID: 'StoryQ', Level: 17},
             { GameID: "Player102934", Level: 40}];

const raid = [
            {   Title: "FFXIV", 
                UserId: 1, 
                Team: IDS,
                Durations: 20, 
                Result: "Win"
            },
            {   Title: "FFXIV", 
                UserId: 1, 
                Team: IDS,
                Durations: 20, 
                Result: "Win"
            },
            {   Title: "FFXIV", 
                UserId: 1, 
                Team: IDS,
                Durations: 20, 
                Result: "Win"
            },
            {   Title: "FFXIV", 
                UserId: 1, 
                Team: IDLost,
                Durations: 20, 
                Result: "Lost"
            },
            {   Title: "FFXIV", 
                UserId: 1, 
                Team: IDLost,
                Durations: 20, 
                Result: "Lost"
            }];




// deleteReivew(review);
// insertReivew(review, raid);



let game = new Promise(function (resolve, reject) {
    resolve(extractGames(1));
});

game.then(function (result){
    console.log(result)
})

let team = new Promise(function (resolve, reject) {
    resolve(extractTeam("FFXIV", 1));
});


team.then(function (result){
    console.log(result)
})
