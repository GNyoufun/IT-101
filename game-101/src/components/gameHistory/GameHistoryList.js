import { Container, Stack } from "@mui/material";

import { AddNewRecordButton, GameList, SearchBar } from ".";
import GAMES from "../../_mock/games";

export default function GameHistoryList() {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={4}
      >
        <SearchBar />
        <AddNewRecordButton />
      </Stack>

      <Container>
        <GameList games={GAMES} />
      </Container>
    </Container>
  );
}
