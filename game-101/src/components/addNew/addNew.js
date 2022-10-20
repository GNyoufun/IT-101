import * as React from "react";

import { Box, Grid } from "@mui/material";

import { AddNewGame, AddNewRecord } from "./";

/* router: /add-new
 * click "Add New Game" will redirect to "/add-game"
 * click "Add New Record" will redirect to "/add-record"
 */
export default function AddNew() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={6}
        columns={14}
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Grid item xs={5}>
          <AddNewGame />
        </Grid>
        <Grid item xs={5}>
          <AddNewRecord />
        </Grid>
      </Grid>
    </Box>
  );
}
