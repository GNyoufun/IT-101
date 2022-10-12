import { Route, Routes } from "react-router";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import {
  AddGameForm,
  AddNew,
  AddRecordForm,
  ChangeDetails,
  DashboardContent,
  GameHistoryList,
  GameHistoryTable,
} from "./components";
import { SignInUp, MainPage } from "./pages";
import dTheme from "./style/theme";

const App = () => {
  return (
    <ThemeProvider theme={dTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<SignInUp />} />
        <Route path="/" element={<MainPage page={<DashboardContent />} />} />
        <Route
          path="/history"
          element={<MainPage page={<GameHistoryList />} />}
        />
        <Route
          path="/people"
          element={<MainPage page={<DashboardContent />} />}
        />
        <Route
          path="/setting"
          element={<MainPage page={<ChangeDetails />} />}
        />
        <Route
          path="/add-record"
          element={<MainPage page={<AddRecordForm />} />}
        />
        <Route path="/add-game" element={<MainPage page={<AddGameForm />} />} />
        <Route path="/add-new" element={<MainPage page={<AddNew />} />} />
        <Route
          path="/table"
          element={<MainPage page={<GameHistoryTable />} />}
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
