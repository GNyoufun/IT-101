import { Container, Stack } from "@mui/material";

import { GameList, SearchBar } from "./";
import { AddNewButton } from "../../style/buttonStyle";
import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

import { GetAllGames } from "../apiRequest/DataStorage";

import GAMES from "../../_mock/games";

/*
var GAMES = GetAllGames();
*/

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
        <AddNewButton variant="contained" href="/add-game" disableRipple>
          + New Game
        </AddNewButton>
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
