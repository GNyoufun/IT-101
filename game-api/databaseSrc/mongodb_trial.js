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
    extractTeam,

    insertUser,

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

// User ID Inserts
const user = [ {_id: 0,
    UserName: "User101",
    UserPassword: "Password101",
    Token: "Token101",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
    },
    {_id: 1,
    UserName: "User102",
    UserPassword: "Password102",
    Token: "Token102",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
    },
    {_id: 2,
    UserName: "User103",
    UserPassword: "Password103",
    Token: "Token103",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
    },
    {_id: 3,
    UserName: "User104",
    UserPassword: "Password104",
    Token: "Token104",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
    },
    {_id: 4,
    UserName: "User105",
    UserPassword: "Password105",
    Token: "Token105",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
    },
    {_id: 5,
    UserName: "User106",
    UserPassword: "Password106",
    Token: "Token106",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
    },
    {_id: 6,
    UserName: "User107",
    UserPassword: "Password107",
    Token: "Token107",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
    },
    {_id: 7,
    UserName: "User108",
    UserPassword: "Password108",
    Token: "Token108",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
    },
    {_id: 8,
    UserName: "User109",
    UserPassword: "Password109",
    Token: "Token109",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
    }];

const badUser = [{
    UserName: "BadUser",
    UserPassword: "BadPassword",
    Token: "BadToken",
    Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
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
