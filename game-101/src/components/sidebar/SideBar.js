import * as React from "react";

import { Link } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from "@mui/material/Drawer";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { LogoutButton, SideBarListItems } from "./";

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
  const [open, setOpen] = React.useState(false);
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
                {sessionStorage.getItem("user_name")} {/* TODO: Load this differently?*/}
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

        {/* Side Bar items */}
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
          {/* Light Dark Switch */}
          {/* <Box sx={{ ml: 3 }}>
            <LightDarkSwitch />
          </Box> */}

          {/* Logout button, after clicking it, direct to "/login" */}
          <Box>
            <IconButton component={Link} to="/login">
              <LogoutButton />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
}
