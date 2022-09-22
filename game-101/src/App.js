import { Route, Routes } from "react-router";

import { Box, CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import {
  AddGameForm,
  AddNew,
  AddRecordForm,
  ChangeDetails,
  DashboardContent,
  GameHistoryList,
  SideBar,
} from "./components";
import dTheme from "./style/theme";

const App = () => {
  return (
    <ThemeProvider theme={dTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/history" element={<GameHistoryList />} />
          <Route path="/people" element={<DashboardContent />} />
          <Route path="/setting" element={<ChangeDetails />} />
          <Route path="/add-record" element={<AddRecordForm />} />
          <Route path="/add-game" element={<AddGameForm />} />
          <Route path="/add-new" element={<AddNew />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
