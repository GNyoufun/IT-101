import { Container, Stack } from "@mui/material";

import { AddNewGameButton, GameList, SearchBar } from "./";
import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

import GAMES from "../../_mock/games";

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
  console.log(g);
}

async function retrieveGames() {
  var response = await GetAuthorizedResponse("/users/{user_id}/games", "GET");
  if (response.status === 200) {
    var responseData = await response.json();
    return convertResponseData(responseData);
  }
}

//var GAMES = retrieveGames();

/* router: /history
 * Display all the games with Name and Picture
 */
export default function GameHistoryList() {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={4}
      >
        <SearchBar />
        <AddNewGameButton />
      </Stack>

      {/* Go to "GameList.js" in "components/gameHistory"
       * A container that holds all the games
       */}
      <Container>
        <GameList games={GAMES} />
      </Container>
    </Container>
  );
}
