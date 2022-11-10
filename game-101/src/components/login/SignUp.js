import * as React from "react";

import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";

import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

async function sendSignUp(formData) {
  // Make the send data into a json object
  var sendData = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  };

  // Get the response from the server
  var response = await GetAuthorizedResponse(
    "/users",
    "POST",
    JSON.stringify(sendData),
    true
  );

  if (response.status === 200) {
    // Get the response data
    var responseData = await response.json();
    // The id and token for the user
    //console.log(responseData);

    sessionStorage.setItem("user_id", responseData._id);
    sessionStorage.setItem("user_token", responseData.Token);
    sessionStorage.setItem("user_name", responseData.UserName);

    //console.log("User signed up.");

    // Signup succeeded, redirect to the home page
    window.location.href = "/";
    return true;
  } else {
    //console.log("Error signing up. Response status: " + response.status);
    return false;
  }
}

export default function SignUp() {
  const [success, setSuccess] = React.useState(null);

  // Define function to occur on click on submit button
  const handleSubmit = (event) => {
    // Prevent default behaviour
    event.preventDefault();

    // Get the form data
    const data = new FormData(event.currentTarget);

    // Send the data to the server
    sendSignUp(data).then((response) => {
      if (response) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    });
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
        <Typography variant="h4">Create Account</Typography>
        <Typography variant="h6">Sign up to get started!</Typography>
      </Box>
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

      {success === true ? (
        <Grid container sx={{ justifyContent: "center" }}>
          <Alert variant="filled" severity="success">
            Sign Up successful.
          </Alert>
        </Grid>
      ) : null}

      {success === null ? (
        <Grid container sx={{ justifyContent: "center" }}>
          <Alert variant="filled" severity="info">
            Please enter your username and password.
          </Alert>
        </Grid>
      ) : null}

      {success === false ? (
        <Grid container sx={{ justifyContent: "center" }}>
          <Alert variant="filled" severity="error">
            Signup failed: Username unavailable.
          </Alert>
        </Grid>
      ) : null}
    </Box>
  );
}
