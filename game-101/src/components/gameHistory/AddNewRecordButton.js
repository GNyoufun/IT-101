import * as React from "react";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  "&:hover": {
    backgroundColor: "#2C344A",
    borderColor: "#2C344A",
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
    <AddNewRecord variant="contained" disableRipple>
      + New Record
    </AddNewRecord>
  );
}
