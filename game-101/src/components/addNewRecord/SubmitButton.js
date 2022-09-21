import * as React from "react";

import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const Submit = styled(Button)({
  borderRadius: 50,
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 15py",
  border: "1px solid",
  lineHeight: 1.2,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
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
    backgroundColor: "#3B83CE",
    borderColor: "#3B83CE",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
  },
});

export default function SubmitButton() {
  return (
    <Submit variant="contained" type="submit">
      Submit
    </Submit>
  );
}
