import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid, Stack } from "@mui/material";

const { GetAuthorizedResponse } = require("./AuthorizedRequest");


export default function Loading()
{
    return (
        <Grid
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Box
            display="flex"
            sx={{
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
            }}
            >
            <CircularProgress />
            </Box>
        </Grid>);
}

// Store locally
// TODO: Avoid multiple components requesting the same data concurrently causing multiple requests
let dashboardPromise = null;
let dashboardData = undefined;
let gamePromise = null;
let gameData = undefined;
let gameNamesData = undefined;

function convertDashboardData(summaryResponse) {
    // Store the data for each component to send back in a an object
    var MostWonData = {};
    var RecentRaidsData = [];
    var TimeSpentData = [];
    var TimeSpentEachData = [];

    // Get the most won game
    var mostWon = -1;
    var mostWonGame = "No Game";
    for (let i = 0; i < summaryResponse.MostWon.length; i++) {
        if (summaryResponse.MostWon[i].winRate > mostWon) {
            mostWon = summaryResponse.MostWon[i].winRate;
            mostWonGame = summaryResponse.MostWon[i].Title;
        }
    }

    if (mostWon === -1)
    {
        mostWon = "No Games";
    }
    
    // Set the most one game
    // TODO: Check that the game is not null/empty
    MostWonData.mostWon = mostWon;
    MostWonData.mostWonGame = mostWonGame;
    
    // Load the time spent playing each game
    for (let i = 0; i < summaryResponse.TimeSpent.length; i++) {
        var name = summaryResponse.TimeSpent[i].Title;
        var value = summaryResponse.TimeSpent[i].totalTime;
        TimeSpentData.push({name: name, value: value});
    }

    // Load the time spent playing each day
    for (const [key, value] of Object.entries(summaryResponse.TimeSpentEach)) {
        if (key === "totalTime") { continue;}
        // Calculate the date from the number of days in the past for each day
        var date = new Date();
        date.setDate(date.getDate() - key.replace("day", ""));
        // Get the day of the week as short name
        var day = date.toLocaleDateString("en-US", { weekday: "short" });
        //var day = date.toLocaleString('default', { weekday: 'long' });
        TimeSpentEachData.push({time: day, "amount": value/60});
        //TimeSpentEachData.push({"time": key, "amount": value/60});
    }
    
    // Reverse the array so that the most recent days are first
    TimeSpentEachData.reverse();

    // ID, name, date, game, outcome
    for (let i = 0; i < summaryResponse.RecentRaids.length; i++) {
        var raid = summaryResponse.RecentRaids[i];
        var id = raid._id;
        var game = raid.Title;
        // Get the date as a DD/MM/YYYY string
        var raidDate = new Date(raid.Date);
        var dateStr = raidDate.toLocaleDateString("en-GB");
        var outcome = raid.Result;
        var comment = raid.comments;
        RecentRaidsData.push({id: id, date: dateStr, game: game, outcome: outcome, comments: comment});
    }

    return {
        MostWonData: MostWonData,
        RecentRaidsData: RecentRaidsData,
        TimeSpentData: TimeSpentData,
        TimeSpentEachData: TimeSpentEachData,
    };
}

async function retrieveDashboardData()
{
    var dp = GetAuthorizedResponse("/users/{user_id}/summary", "GET");
    var response = await dp;

    if (response.status === 200) {
        var responseData = await response.json();
        console.log(responseData);
        
        // Convert the results to the format we want
        dashboardData = convertDashboardData(responseData);
    }
}


export async function DeleteRaid(id)
{
    if (id === undefined || id === null || id === "")
    {
        return;
    }

    var url = "/users/{user_id}/reviews/" + id;

    // Wait for the deletion to occur
    var deleteProm = GetAuthorizedResponse(url, "DELETE");
    var response = await deleteProm;

    if (response.status === 200) {
        var responseData = await response.json();
        console.log(responseData);
    }
}

export async function GetDashboardContent()
{
    // TODO: Avoid double requesting with && dashboardPromise == null
    if (dashboardData === undefined && dashboardPromise == null) {
        // Get the summary data
        dashboardPromise = retrieveDashboardData();
    }
    if (dashboardPromise !== null) {
        await dashboardPromise;
        dashboardPromise = "Loaded!";
    }

    return dashboardData;
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

        // Convert the data to the format we want
        var gameReviews = convertGameReviewsData(responseData);

        return gameReviews;
    }
    return null;
}

function convertGameReviewsData(gameReviewsResponse) {
    // Store the data for each component to send back in a an object
    var GameReviewsData = [];
    for(let i = 0; i < gameReviewsResponse.length; i++) {

        // Construct the teammates string
        var teammates = "";
        for (let j = 0; j < gameReviewsResponse[i].Team.length; j++) {
            teammates += gameReviewsResponse[i].Team[j].InGameID;
            teammates += " lv.";
            teammates += gameReviewsResponse[i].Team[j].Level;
            if (j < gameReviewsResponse[i].Team.length - 1) {
                teammates += ", ";
            }
        }

        // Construct the date string
        var date = new Date(gameReviewsResponse[i].Date);
        var dateStr = date.toLocaleDateString();

        // Construct the data row
        const data = {
            id: gameReviewsResponse[i]._id,
            date: dateStr,
            GameTitle: gameReviewsResponse[i].Title,
            durations: gameReviewsResponse[i].Durations,
            difficulty: gameReviewsResponse[i].Difficulty,
            rating: gameReviewsResponse[i].Rating,
            result: gameReviewsResponse[i].Result,
            team: teammates,
            comments: gameReviewsResponse[i].comments,

            dateRaw : gameReviewsResponse[i].Date,
            teamRaw : gameReviewsResponse[i].Team,
          };
        
        // Add the data to the list
        GameReviewsData.push(data);
    }

    return GameReviewsData;
}


export async function GetGameNames()
{
    // Get the data if it is not already loaded
    if (gameNamesData === undefined && gamePromise == null) {
        gamePromise = retrieveGameData();
    }
    if (gamePromise !== null) {
        await gamePromise;
        gamePromise = "Loaded!";
    }
    return gameNamesData;
}


async function retrieveGameData()
{
    // Get the game names
    var gp = GetAuthorizedResponse("/users/{user_id}/games", "GET");
    var response = await gp;

    if (response.status === 200) {
        var responseData = await response.json();
        //console.log(responseData);

        // Take the game names and put them in a list
        var gameNames = [];
        for (var i = 0; i < responseData.length; i++) {
            gameNames.push(responseData[i].GameTitle);
        }

        // Set the game names data
        gameNamesData = gameNames;

        // Set the game data
        var g = [];
        for (var i = 0; i < responseData.length; i++) {
          g.push({
            id: responseData[i].id || i,
            name: responseData[i].GameTitle || "No Title",
            type: responseData[i].GameType || "No Type",
            cover: responseData[i].Image || "No Cover",
          });
        }

        gameData = g;
    }
}

export async function GetAllGames()
{
    // Get the data if it is not already loaded
    if (gameData === undefined && gamePromise == null) {
        gamePromise = retrieveGameData();
        // // Get all games
        // var promise =  GetAuthorizedResponse("/users/{user_id}/games", "GET");
        // var response = await promise;
        // if (response.status === 200) {
        //     var responseData = await response.json();
        //     console.log(responseData);
        //     gameData = convertGameData(responseData);
        // }
    }
    if (gamePromise !== null) {
        await gamePromise;
    }
    
    return gameData;
    
}