import * as React from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        token: "tokenplaceholder",
      },
      body: JSON.stringify({
        username: data.get("username"),
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box
      noValidate
      onSubmit={handleSubmit}
      component="form"
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">Create Account</Typography>
        <Typography variant="h6">Sign up to get started!</Typography>
      </Box>
      <TextField
        margin="normal"
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
