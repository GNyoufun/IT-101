import * as React from "react";

import { useLocation } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingIcon from "@mui/icons-material/Settings";
import TimelineIcon from "@mui/icons-material/Timeline";
import {
  Box,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function SideBarListItems() {
  const [selectedRoute, setSelectedRoute] = React.useState(
    useLocation().pathname
  );

  const handleListItemClick = (e, to) => {
    setSelectedRoute(to);
  };

  const addNewList = [
    {
      text: "Add New",
      icon: <AddCircleIcon />,
      to: "/add-new",
    },
  ];

  const itemsList = [
    {
      text: "Game History",
      icon: <TimelineIcon />,
      to: "/history",
    },
    {
      text: "Setting",
      icon: <SettingIcon />,
      to: "/setting",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 240,
      }}
    >
      <Divider sx={{ mt: 2 }} />
      <List component="nav" aria-label="main">
        <ListItemButton
          to={"/dashboard"}
          selected={selectedRoute === "/dashboard"}
          onClick={(e) => handleListItemClick(e, "/dashboard")}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        {addNewList.map((item) => {
          const { text, icon } = item;
          return (
            <ListItemButton
              to={item.to}
              key={text}
              selected={selectedRoute === item.to}
              onClick={(e) => handleListItemClick(e, item.to)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          );
        })}

        <Divider sx={{ my: 1 }} />

        {itemsList.map((item) => {
          const { text, icon } = item;
          return (
            <ListItemButton
              to={item.to}
              key={text}
              selected={selectedRoute === item.to}
              onClick={(e) => handleListItemClick(e, item.to)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />
    </Box>
  );
}
