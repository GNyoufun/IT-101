import {Route, Routes} from "react-router"; 
import { Box, CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { SideBar, AddRecordFrom, ChangeDetails, DashboardContent, GameHistoryList } from "./components";
import dTheme from "./style/theme";


const App = () => {
  return (
    <ThemeProvider theme={dTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Routes>
          <Route path="/" element={<DashboardContent />}/>
          <Route path="/history" element={<GameHistoryList />}/>
          <Route path="/people" element={<DashboardContent />}/>
          <Route path="/setting" element={<ChangeDetails />}/>
          <Route path="/add-record" element={<AddRecordFrom />}/>
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
