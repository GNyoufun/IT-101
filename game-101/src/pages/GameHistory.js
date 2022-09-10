import { Box, Container, CssBaseline, Stack } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import {
  AddNewRecordButton,
  GameList,
  SearchBar,
  SideBar,
} from "../components";
import dTheme from "../style/theme";
import GAMES from "../_mock/games";

const GameHistory = () => {
  return (
    <ThemeProvider theme={dTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Container>
          <Stack direction="row" alignItems="center">
            <SearchBar />
            <AddNewRecordButton />
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default GameHistory;
