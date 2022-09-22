import * as React from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

export default function LogoutButton() {
  return (
    <IconButton
      sx={{
        borderRadius: 0,
      }}
    >
      <LogoutIcon
        sx={{
          width: "32px",
          height: "32px",
        }}
      />
    </IconButton>
  );
}
