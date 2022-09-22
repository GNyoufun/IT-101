import { Container, Stack } from "@mui/material";

import { AddNewGameButton, GameList, SearchBar } from "./";
import GAMES from "../../_mock/games";

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

      <Container>
        <GameList games={GAMES} />
      </Container>
    </Container>
  );
}
