import { Box, CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { ChangeDetails, SideBar } from "../components";
import dTheme from "../style/theme";

export default function Setting() {
  return (
    <ThemeProvider theme={dTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <ChangeDetails />
      </Box>
    </ThemeProvider>
  );
}
