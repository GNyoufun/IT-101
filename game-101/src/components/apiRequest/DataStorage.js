const { GetAuthorizedResponse } = require("./AuthorizedRequest");


export async function GetDashboardContent()
{
    // Get the summary data
    var response = await GetAuthorizedResponse("/users/{user_id}/summary", "GET");
    if (response.status === 200) {
        var responseData = await response.json();
        console.log(responseData);
        return responseData;
    }
}

export async function GetReviewsForGame(gameName)
{
    // Set the location to the game name
    const location = "/users/{user_id}/reviews/{game}".replace("{game}", gameName);

    // Get the raid reviews for the given game
    var response = await GetAuthorizedResponse(location, "GET");
    if (response.status === 200) {
        var responseData = await response.json();
        console.log(responseData);
        return responseData;
    }
}

export async function GetGameNames()
{
    // Get the game names
    var response = await GetAuthorizedResponse("/users/{user_id}/games", "GET");
    if (response.status === 200) {
        var responseData = await response.json();
        console.log(responseData);

        // Take the game names and put them in a list
        var gameNames = [];
        for (var i = 0; i < responseData.length; i++) {
            gameNames.push(responseData[i].Title);
        }

        return responseData;
    }
}


function convertGameData(gameResponse) {
    gameResponse = gameResponse[0].Games;
    var g = [];
    for (var i = 0; i < gameResponse.length; i++) {
      g.push({
        id: gameResponse[i].id || i,
        name: gameResponse[i].GameTitle || "No Title",
        type: gameResponse[i].GameType || "No Type",
        cover: gameResponse[i].Image || "No Cover",
      });
    }
    console.log(g);
}

export async function GetAllGames()
{
    // Get all games
    var response = await GetAuthorizedResponse("/users/{user_id}/games", "GET");
    if (response.status === 200) {
        var responseData = await response.json();
        console.log(responseData);

        return convertGameData(responseData);
    }
}