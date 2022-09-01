import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      noValidate
      onSubmit={handleSubmit}
      sx={{
        bgcolor: "background.paper",
        mb: 2,
      }}
    >
      <Typography variant="h4">Create Account,</Typography>
      <Typography variant="h6">Sign up to get started!</Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        name="username"
        label="Username"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        name="email"
        label="Email Address"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
      />

      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ my: 4, px: 4, borderRadius: "16px" }}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
