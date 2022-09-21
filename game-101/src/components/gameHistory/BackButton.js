import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Back = styled(Button)({
  color: "#D2D2D2",
  borderRadius: 50,
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  lineHeight: 1.5,
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
});

const BackButton = () => {
  return (
    <Back variant="text" startIcon={<ArrowBackIcon />}>
      Back
    </Back>
  );
};

export default BackButton;
