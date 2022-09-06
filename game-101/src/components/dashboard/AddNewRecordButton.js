import * as React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const AddNewRecord = styled(Button)({
  borderRadius: 50,
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#151E34",
  borderColor: "#151E34",
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
  /* will change the hover color here */
  "&:hover": {
    backgroundColor: "#C3CFEC",
    borderColor: "#C3CFEC",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#151E34",
    borderColor: "#151E34",
  },
});

export default function AddNewRecordButton() {
  return (
    <Stack spacing={2} direction="row">
      <AddNewRecord variant="contained" disableRipple>
        + New Record
      </AddNewRecord>
    </Stack>
  );
}
