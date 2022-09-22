import * as React from "react";

import {
  Box,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingIcon from "@mui/icons-material/Settings";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function SideBarListItems() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  const itemsList = [
    {
      index: 1,
      text: "Add Record",
      icon: <AddCircleIcon />,
      to: "/add-record",
    },
    {
      index: 2,
      text: "Game History",
      icon: <TimelineIcon />,
      to: "/history",
    },
    {
      index: 3,
      text: "People",
      icon: <PeopleIcon />,
      to: "/people",
    },
    {
      index: 4,
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
      <List component='nav' aria-label='main'>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(e) => handleListItemClick(e, 0)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>
        
        <Divider sx={{ my: 1 }} />

        {itemsList.map((item) => {
          const { text, icon } = item;
          return (
            <ListItemButton
              selected={selectedIndex === item.index}
              onClick={(e) => handleListItemClick(e, item.index)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          );
        })}
        ;
      </List>

      <Divider />
    </Box>
  );
}
