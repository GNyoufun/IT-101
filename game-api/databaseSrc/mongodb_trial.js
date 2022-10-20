const {
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
} = require('./mongooseFunc.js');

const {
  review,
  userid
} = require('./mongooseSchema.js');

// Example schemas
const IDLost = [
  { GameID: 'GAMER1100', Level: 11 },
  { GameID: 'StromBreaker', Level: 18 },
  { GameID: 'StoryQ', Level: 17 }
];

const IDS = [
  { GameID: 'GAMER1100', Level: 11 },
  { GameID: 'StromBreaker', Level: 18 },
  { GameID: 'StoryQ', Level: 17 },
  { GameID: 'Player102934', Level: 40 }
];

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
// const user = [ {_id: 0,
//     UserName: "User101",
//     UserPassword: "Password101",
//     Token: "Token101",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     },
//     {_id: 1,
//     UserName: "User102",
//     UserPassword: "Password102",
//     Token: "Token102",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     },
//     {_id: 2,
//     UserName: "User103",
//     UserPassword: "Password103",
//     Token: "Token103",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     },
//     {_id: 3,
//     UserName: "User104",
//     UserPassword: "Password104",
//     Token: "Token104",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     },
//     {_id: 4,
//     UserName: "User105",
//     UserPassword: "Password105",
//     Token: "Token105",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     },
//     {_id: 5,
//     UserName: "User106",
//     UserPassword: "Password106",
//     Token: "Token106",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     },
//     {_id: 6,
//     UserName: "User107",
//     UserPassword: "Password107",
//     Token: "Token107",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     },
//     {_id: 7,
//     UserName: "User108",
//     UserPassword: "Password108",
//     Token: "Token108",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     },
//     {_id: 8,
//     UserName: "User109",
//     UserPassword: "Password109",
//     Token: "Token109",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     }];

// const badUser = [{
//     UserName: "BadUser",
//     UserPassword: "BadPassword",
//     Token: "BadToken",
//     Games: [{GameTitle: "FFXIV", GameType: "MMORPG"}]
//     }];

// deleteCollection(review);
// insertCollection(review, raid);

// let retrieved = new Promise(function (resolve, reject) {
//     retrieveCollection(review, {Title: "FFXIV"});
// });

// retrieved.then(function (result){
//     console.log(result)
// })


// let game = new Promise(function (resolve, reject) {
//     resolve(extractGames(1));
// });

// game.then(function (result){
//     console.log(result)
// })

// let team = new Promise(function (resolve, reject) {
//     resolve(extractTeam("FFXIV", 1));
// });


// team.then(function (result){
//     console.log(result)
// })


// bestWinRate("6347bc211c807d438298e193").then(data => console.log(data));
// totalTime("6347bc211c807d438298e193").then(data => console.log(data));
// totalTimeByDay("6347bc211c807d438298e193").then(data => console.log(data));

// retrieveByTeammate("Overwatch", "63478fd9fb0388e56c026258", 
//   {InGameID: 'Brendan', Level: 3})
//   .then(data => console.log(data));

// retrieveCollection(review, {UserId: "63478fd9fb0388e56c026258"}, )
//   .then(data => {
    
//     for (let i = 0; i <data.length; i++){
//       console.log(data[i])}
//     }
//   );

// extractTeam("Overwatch", "63478fd9fb0388e56c026258").then(data => console.log(data));
// extractGames("63478fd9fb0388e56c026258").then(data => console.log(data));
// TeamWinRate("Overwatch", "63478fd9fb0388e56c026258").then(data => console.log(data));
// gameWinRate("Overwatch", "63478fd9fb0388e56c026258").then(data => console.log(data));
// average("Overwatch", "63478fd9fb0388e56c026258", "Rating").then(data => console.log(data));
// median("Overwatch", "63478fd9fb0388e56c026258", "Rating").then(data => console.log(data));

// retrieveLastN(10, "63478fd9fb0388e56c026258").then(data => console.log(data));