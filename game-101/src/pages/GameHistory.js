import { Box, CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { GameHistoryList, SideBar } from "../components";
import dTheme from "../style/theme";

export default function GameHistory() {
  return (
    <ThemeProvider theme={dTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <GameHistoryList />
      </Box>
    </ThemeProvider>
  );
}