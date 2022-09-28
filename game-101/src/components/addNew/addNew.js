import * as React from "react";

import { Box } from "@mui/material";

import { AddNewGame, AddNewRecord } from "./";

export default function AddNew() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AddNewGame />
      <AddNewRecord />
    </Box>
  );
}
