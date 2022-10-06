import * as React from "react";

import { Box } from "@mui/material";

import { AddNewGame, AddNewRecord } from "./";

/* router: /add-new
 * click "Add New Game" will redirect to "/add-game"
 * click "Add New Record" will redirect to "/add-record"
 */
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
