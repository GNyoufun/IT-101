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

import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

async function sendNewGame(formData) {
  // Make the send data into a json object
  var sendData = {
    GameTitle: formData.get("GameTitle"),
    GameType: formData.get("GameType")
  };

  // Get the response from the server
  var response = await GetAuthorizedResponse("/users/{user_id}/games", "POST", JSON.stringify(sendData));

  if (response.status === 200) {
    // Game successfully added, redirect to the home page
    // TODO: Use a React Router redirect
    window.location.href = "/";
    return true;
  } else {
    console.log("Error adding new game.");
    return false;
  }
}

/* router: /add-game */
export default function AddGameForm() {
  const handleSubmit = (event) => {
    // Prevent default behaviour
    event.preventDefault();
    // Get the form data
    const data = new FormData(event.currentTarget);

    // TODO: Check that this game hasn't already been recently sent

    // Send the data to the server
    sendNewGame(data);
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
