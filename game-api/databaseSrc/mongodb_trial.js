const {
  retrieveReview,
  insertReivew,
  updateReivew,
  FindReplaceReivew,
  deleteReivew
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
                userId: "User101", 
                Team: IDS,
                Durations: 20, 
                Result: "Win"
            },
            {   Title: "FFXIV", 
                userId: "User101", 
                Team: IDS,
                Durations: 20, 
                Result: "Win"
            },
            {   Title: "FFXIV", 
                userId: "User101", 
                Team: IDS,
                Durations: 20, 
                Result: "Win"
            },
            {   Title: "FFXIV", 
                userId: "User101", 
                Team: IDLost,
                Durations: 20, 
                Result: "Lost"
            },
            {   Title: "FFXIV", 
                userId: "User101", 
                Team: IDLost,
                Durations: 20, 
                Result: "Lost"
            }];






// insertReivew(raid);
// deleteReivew();


// Example input
// retrieveReview({ Title: "FFXIV"}, function (err, reviews) {
//     const players = [];
//     if (err) {
//         console.log(err);
//     }
//     console.log(reviews);
// });
