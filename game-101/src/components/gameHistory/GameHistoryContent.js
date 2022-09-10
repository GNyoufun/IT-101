import { Container, Stack } from "@mui/material";

import { AddNewRecordButton, GameList, SearchBar } from "./";
import GAMES from "../../_mock/games";

export default function GameHistoryContent() {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
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
