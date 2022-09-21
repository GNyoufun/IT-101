import * as React from "react";

import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { SubmitButton } from "../addNewRecord";

export default function AddGameForm() {
  return (
    <Box
      component="form"
      sx={{
        flexGrow: 2,
        height: "100vh",
        overflow: "auto",
      }}
      /* onSubmit={handleSubmit} */
      onKeyPress={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
      noValidate
      autoComplete="off"
    >
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Box sx={{ my: 3, ml: 4 }}>
              <Typography variant="h4">Add New Game</Typography>
              <Typography variant="h6">
                Add new game to your game history
              </Typography>
            </Box>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Game Name"
                name="game-name"
                required
                variant="outlined"
                margin="normal"
              />

              <TextField
                fullWidth
                label="Type"
                name="type"
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid container xs={12} sx={{ mt: 4, justifyContent: "center" }}>
              <SubmitButton />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
