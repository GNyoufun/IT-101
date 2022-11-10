import React, { useState, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import Loading from "../apiRequest/DataStorage";

import { GameList } from "./";
import { AddNewButton } from "../../style/buttonStyle";

import { GetAllGames } from "../apiRequest/DataStorage";

/* router: /history
 * Display all the games with Name and Picture
 */
export default function GameHistoryList() {
  const [gameList, setAllGames] = useState({});
  const [loading, setLoading] = useState(true);

  async function retrieveGames() {
    GetAllGames().then((gameData) => {
      // Use the gameData to set the state of the gameList
      setAllGames(gameData);
      setLoading(false);
    });
  }

  // Retrieve all games when the page is loaded
  //useEffect(() => {
  //  retrieveGames();
  //}, []);

  // function convertResponseData(responseData) {
  //  responseData = responseData[0].Games;
  //  var g = [];
  //  for (var i = 0; i < responseData.length; i++) {
  //    g.push({
  //      id: responseData[i].id || i,
  //      name: responseData[i].GameTitle || "No Title",
  //      type: responseData[i].GameType || "No Type",
  //      cover: responseData[i].Image || "No Cover",
  //    });
  //  }
  //  setLoading(false);
  //  console.log(g);
  //}

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
        Loading()
      ) : (
        <Container>
          <Stack direction="row" justifyContent="end" px={4} py={4}>
            <AddNewButton variant="contained" href="/add-game" disableRipple>
              + New Game
            </AddNewButton>
          </Stack>
          <Container>
            <GameList />
          </Container>
        </Container>
      )}
    </Container>
  );
}
