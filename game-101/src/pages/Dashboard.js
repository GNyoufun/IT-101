import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { SideBar, DashboardContent} from "../components";
import dTheme from "../style/theme";


const Dashboard = () => {
  return (
    <ThemeProvider theme={dTheme}>
       <CssBaseline />
      <Box sx={{ display: 'flex'}}>
        <SideBar />
        <DashboardContent/>
     </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
