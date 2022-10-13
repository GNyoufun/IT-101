import * as React from "react";

import { GetAuthorizedResponse, GetLoginResponse } from "../apiRequest/AuthorizedRequest";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

async function sendSignIn(formData) {
  // Make the send data into a json object
  var sendData = {
    username: formData.get("username"),
    password: formData.get("password")
  };

  // Store whether user wishes to be remembered
  // var doRemember = formData.get("remember");
  // localStorage.setItem("remember", doRemember);

  // Get the response from the server
  var response = await GetLoginResponse(sendData.username, sendData.password);
  if (response.status === 200) {
    // Get the response data
    var responseData = await response.json();
    console.log(responseData);
    // The id and token for the user
    console.log(responseData._id + ":" + responseData.Token);

    // TODO: Base on whether the user wishes to be remembered or not
    sessionStorage.setItem("user_id", responseData._id);
    sessionStorage.setItem("user_token", responseData.Token);
    sessionStorage.setItem("user_name", responseData.UserName);
    console.log("User \'" + responseData.UserName + "\' logged in.");
    
    // Login succeeded, redirect to the home page
    // TODO: Use a React Router redirect
    window.location.href = "/";
    return true;
  } else {
    console.log("Error signing in.");
    return false;
  }
}

export default function SignIn() {
  const handleSubmit = (event) => {
    // Prevent default behaviour
    event.preventDefault();
    // Get the form data
    const data = new FormData(event.currentTarget);

    // TODO: Check validity of form data for username, password, and email before running sendSignUp()

    // Send the data to the server
    sendSignIn(data);
  };

  return (
    <Box
      noValidate
      onSubmit={handleSubmit}
      component="form"
      sx={{
        bgcolor: "background.paper",
        mb: 2,
      }}
    >
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">Welcome</Typography>
        <Typography variant="h6">Sign in to continue!</Typography>
      </Box>

      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 1 }}
      >
        <Grid item xs>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            name="remember"
            id="remember"
          />
        </Grid>
      </Grid>

      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ my: 3, px: 4, borderRadius: "16px" }}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
