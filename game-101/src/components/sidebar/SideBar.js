import * as React from "react";

import { Avatar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import {
  LogoutButton,
  LightDarkSwitch,
  SideBarListItems,
} from "..";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    elevation: 4,
    height: "100vh",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    color: "#AEB6D0",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    border: "none",

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
            <Avatar sx={{ width: 54, height: 54, ml: "4px", mr: 1 }}>UN</Avatar>
            <Box>
              <Typography
                variant="h5"
                component="h6"
                sx={{ mt: "6px", lineHeight: 1.1 }}
              >
                Username
              </Typography>
              <Typography
                variant="body"
                component="h6"
                color="text.secondary"
                sx={{ fontSize: 12 }}
              >
                address@email.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid item>
          <SideBarListItems />
        </Grid>
      </Grid>

      <Grid
        item
        display="block"
        sx={{ position: "sticky", top: "95vh", bottom: 0 }}
      >
        <Divider />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 1 }}
        >
            <Box sx={{ml:3}}>
              <LightDarkSwitch />
            </Box>
            <Box sx={{my:[1]}}>
              <LogoutButton />
            </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
}
