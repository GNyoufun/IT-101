import { Box, CssBaseline, Stack } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { SideBar } from "../components";
import { AddRecordFrom} from "../components";
import dTheme from "../style/theme";

export default function AddNewRecord() {
  return (
    <ThemeProvider theme={dTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <AddRecordFrom />
      </Box>
    </ThemeProvider>
  );
}
