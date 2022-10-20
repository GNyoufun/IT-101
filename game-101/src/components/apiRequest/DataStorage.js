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
    var mostWonGame = "";
    for (let i = 0; i < summaryResponse.MostWon.length; i++) {
        if (summaryResponse.MostWon[i].winRate > mostWon) {
            mostWon = summaryResponse.MostWon[i].winRate;
            mostWonGame = summaryResponse.MostWon[i].Title;
        }
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
        RecentRaidsData.push({id: id, date: dateStr, game: game, outcome: outcome});
    }

    return {
        MostWonData: MostWonData,
        RecentRaidsData: RecentRaidsData,
        TimeSpentData: TimeSpentData,
        TimeSpentEachData: TimeSpentEachData,
    };
}


export async function GetDashboardContent()
{
    // TODO: Avoid double requesting with && dashboardPromise == null
    if (dashboardData === undefined) {
        // Get the summary data
        dashboardPromise = GetAuthorizedResponse("/users/{user_id}/summary", "GET");
        var response = await dashboardPromise;
        if (response.status === 200) {
            var responseData = await response.json();
            console.log(responseData);
            
            // Convert the results to the format we want
            dashboardData = convertDashboardData(responseData);
        }
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
        return responseData;
    }
}

export async function GetGameNames()
{
    // Get the data if it is not already loaded
    if (gameNamesData === undefined) {
        // Get the game names
        gamePromise = GetAuthorizedResponse("/users/{user_id}/games", "GET");
        var response = await gamePromise;
        if (response.status === 200) {
            var responseData = await response.json();
            console.log(responseData);

            // Take the game names and put them in a list
            var gameNames = [];
            for (var i = 0; i < responseData.length; i++) {
                gameNames.push(responseData[i].GameTitle);
            }

            gameNamesData = gameNames;
        }
    }
    return gameNamesData;
}


function convertGameData(gameResponse) {
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
    return g;
}

export async function GetAllGames()
{
    // Get the data if it is not already loaded
    if (gameData === undefined) {
        // Get all games
        var promise =  GetAuthorizedResponse("/users/{user_id}/games", "GET");
        var response = await promise;
        if (response.status === 200) {
            var responseData = await response.json();
            console.log(responseData);
            gameData = convertGameData(responseData);
        }
    }
    
    return gameData;
    
}