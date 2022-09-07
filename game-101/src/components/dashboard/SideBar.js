import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Avatar, Typography } from "@mui/material";
import { LightDarkSwitch, SideBarListItems} from "../../components";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    height: "100vh",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",

    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(8),
    }),
  },
}));

export default function SideBar() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pr: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>

      <Grid container flexDirection="column" justifyContent="space-between">
        <Grid item>
          <Grid container wrap="nowrap">
            <Avatar sx={{ width: 48, height: 48, mx: [1] }}>UN</Avatar>
            <Box>
              <Typography variant="h5" component="h6">
                Username
              </Typography>
              <Typography variant="body" component="h4" sx={{ fontSize: 16 }}>
                address@email.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid item>
          <SideBarListItems />
        </Grid>
      </Grid>

      <Grid item display="block" sx={{ position: "sticky", top: "90vh" }}>
        <Divider />
        <Box
          alignItems="center"
          justifyContent="center"
          sx={{ pt: 2, textAlign: "center" }}
        >
          <LightDarkSwitch />
        </Box>
      </Grid>
    </Drawer>
  );
}
