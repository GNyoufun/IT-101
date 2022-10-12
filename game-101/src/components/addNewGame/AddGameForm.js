import * as React from "react";

import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { SubmitButton } from "../../style/buttonStyle";

/* router: /add-game */
export default function AddGameForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var sendData = {
      GameTitle: data.get("GameTitle"),
      GameType: data.get("GameType"),
    };
    // test printing
    console.log(sendData);
  };

  return (
    <Box
      component="form"
      sx={{
        flexGrow: 2,
        height: "100vh",
        overflow: "auto",
      }}
      onSubmit={handleSubmit}
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
          {/* Add New Game text */}
          <Grid container spacing={3} alignItems="center">
            <Grid item sx={{ mt: 3 }}>
              <Typography variant="h4">Add New Game</Typography>
              <Typography variant="h6">
                Add new game to your game history
              </Typography>
            </Grid>

            {/* Input game's name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Game Name"
                name="GameTitle"
                required
                variant="outlined"
                margin="normal"
              />

              {/* Input game's type */}
              <TextField
                fullWidth
                label="Type"
                name="GameType"
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>

            {/* Submit button */}
            <Grid container sx={{ mt: 4, justifyContent: "center" }}>
              <SubmitButton variant="contained" type="submit">
                Submit
              </SubmitButton>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
