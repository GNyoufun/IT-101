import * as React from "react";

import { Button } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  return (
    <Button variant="text" startIcon={<ArrowBackIcon />}>
      Back
    </Button>
  );
};

export default BackButton;
