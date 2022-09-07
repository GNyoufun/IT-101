import Box from "@mui/material/Box";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { SideBar} from "../components";
import dTheme from "../style/theme";


const Dashboard = () => {
  return (
    <ThemeProvider theme={dTheme}>
      <Box sx={{ display: 'flex'}}>
        <SideBar />
     </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
