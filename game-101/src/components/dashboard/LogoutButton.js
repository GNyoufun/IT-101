import * as React from "react";

import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutButton() {
  return (
    <IconButton
      sx={{
        borderRadius: 0,
      }}
    >
      <LogoutIcon />
    </IconButton>
  );
}
