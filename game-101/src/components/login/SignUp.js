import * as React from "react";

import { useLocation } from "react-router-dom";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";


async function sendSignUp(formData) {
  // Make the send data into a json object
  var sendData = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email")
  };

  // Get the response from the server
  var response = await GetAuthorizedResponse("/users", "POST", JSON.stringify(sendData));
  if (response.status === 200) {
    // Get the response data
    var responseData = await response.json();
    // The id and token for the user
    console.log(responseData._id + ":" + responseData.Token);

    // TODO: Base on whether the user wishes to be remembered or not
    if (localStorage.getItem("remember") === "true") {
      localStorage.setItem("user_id", responseData._id);
      localStorage.setItem("user_token", responseData.Token);
    } else {
      sessionStorage.setItem("user_id", responseData._id);
      sessionStorage.setItem("user_token", responseData.Token);
    }
    console.log("User signed up.");
    
    // Signup succeeded, redirect to the home page
    // TODO: Use a React Router redirect
    window.location.href = "/";
    return true;
  } else {
    console.log("Error signing up.");
    return false;
  }
}

export default function SignUp() {
  // Define function to occur on click on submit button
  const handleSubmit = (event) => {
    // Prevent default behaviour
    event.preventDefault();
    // Get the form data
    const data = new FormData(event.currentTarget);

    // TODO: Check validity of form data for username, password, and email before running sendSignUp()

    // Send the data to the server
    sendSignUp(data);
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
