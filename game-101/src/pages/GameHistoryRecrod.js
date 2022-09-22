import { Box, CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { GameHistoryTable, SideBar } from "../components";
import dTheme from "../style/theme";

export default function GameHistoryRecord() {
  return (
    <ThemeProvider theme={dTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <GameHistoryTable />
      </Box>
    </ThemeProvider>
  );
}
