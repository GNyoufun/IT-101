import { Box } from "@mui/material";
import { SideBar } from "../components";

const MainPage = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      {props.page}
    </Box>
  );
};

export default MainPage;
