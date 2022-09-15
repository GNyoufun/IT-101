import * as React from "react";

import { Box, Container, Grid, Paper } from "@mui/material";
import {Comment, SubmitButton, SelectDateTime, SelectGameName, SelectOutcome, SelectTeammates} from "./";

export default function AddRecordFrom() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 8, mb: 2 }}>
        <Paper
              sx={{
                p: 4,
              }}
            >
        <Grid container spacing={4}>
          {/* Text */}
          <Grid item xs={12} rowSpacing={2}>
              <SelectGameName />
          </Grid>

          <Grid item xs={12} rowSpacing={2}>
              <SelectDateTime />
          </Grid>

       
        <Grid item xs={12} sx={{mx:1}}>
            <SelectOutcome />
          </Grid>

          <Grid item xs={12}>
            <SelectTeammates />
          </Grid>

          <Grid item xs={12}>
            <Comment />
          </Grid>
        </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
