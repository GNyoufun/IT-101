import React, { useState, useEffect } from "react";
import { Box, Container, CircularProgress, Stack } from "@mui/material";

import { GameList, SearchBar } from "./";
import { AddNewButton } from "../../style/buttonStyle";
import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

import GAMES from "../../_mock/games";

//var GAMES = retrieveGames();

/* router: /history
 * Display all the games with Name and Picture
 */
export default function GameHistoryList() {
  const [loading, setLoading] = useState(true);

  function convertResponseData(responseData) {
    responseData = responseData[0].Games;
    var g = [];
    for (var i = 0; i < responseData.length; i++) {
      g.push({
        id: responseData[i].id || i,
        name: responseData[i].GameTitle || "No Title",
        type: responseData[i].GameType || "No Type",
        cover: responseData[i].Image || "No Cover",
      });
    }
    setLoading(false);
    console.log(g);
  }
  
  async function retrieveGames() {
    var response = await GetAuthorizedResponse("/users/{user_id}/games", "GET");
    if (response.status === 200) {
      var responseData = await response.json();
      return convertResponseData(responseData);
    }
  }

  useEffect(() => {
    setLoading(true);
    // retrive data
    retrieveGames();
    // load for 2 sec
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Container>
      {loading ? (
        <Box
          display="flex"
          
          sx={{alignContent:"center", alignItems: 'center', justifyContent:"center"}} >
            <CircularProgress />
        </Box>
      ) : (
        <div>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            px={4}
            py={4}
          >
            <SearchBar />
            <AddNewButton variant='contained' href='/add-game' disableRipple>
              + New Game
            </AddNewButton>
          </Stack>

          <Container>
            <GameList games={GAMES} />
          </Container>
        </div>
      )}
    </Container>
  );
}
