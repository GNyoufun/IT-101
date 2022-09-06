import * as React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Stack from "@mui/material/Stack";

const Logout = styled(Button)({
  borderRadius: 0,
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "rgba(83, 89, 128, 0.5)",
  borderColor: "rgba(83, 89, 128, 0.5)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "rgba(109, 130, 255, 0.5)",
    borderColor: "rgba(109, 130, 255, 0.5)",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "rgba(83, 89, 128, 0.5)",
    borderColor: "rgba(83, 89, 128, 0.5)",
  },
});

export default function LogoutButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Logout variant="contained" endIcon={<LogoutIcon />}>
        Logout
      </Logout>
    </Stack>
  );
}
