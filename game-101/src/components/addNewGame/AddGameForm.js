import * as React from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { SubmitButton } from "../../style/style";

/* router: /add-game */
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
                name="game-name"
                required
                variant="outlined"
                margin="normal"
              />

              {/* Input game's type */}
              <TextField
                fullWidth
                label="Type"
                name="type"
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>

            {/* Upload Image button */}
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Image
                <input type="file" accept="image/*" hidden />
              </Button>
            </Grid>

            {/* Submit button */}
            <Grid container xs={12} sx={{ mt: 4, justifyContent: "center" }}>
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
