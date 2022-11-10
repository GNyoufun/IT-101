import * as React from "react";

import { GetLoginResponse } from "../apiRequest/AuthorizedRequest";

import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";

async function sendSignIn(formData) {
  // Clear user_token, user_id, and user_name from sessionStorage
  sessionStorage.clear();

  // Make the send data into a json object
  var sendData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // Store whether user wishes to be remembered
  // var doRemember = formData.get("remember");
  // localStorage.setItem("remember", doRemember);

  // Get the response from the server
  var response = await GetLoginResponse(sendData.username, sendData.password);
  if (response.status === 200) {
    // Get the response data
    var responseData = await response.json();

    // TODO: Base on whether the user wishes to be remembered or not
    sessionStorage.setItem("user_id", responseData._id);
    sessionStorage.setItem("user_token", responseData.Token);
    sessionStorage.setItem("user_name", responseData.UserName);
    console.log("User '" + responseData.UserName + "' logged in.");

    // Login succeeded, redirect to the home page
    // TODO: Use a React Router redirect
    window.location.href = "/dashboard";
    return true;
  } else {
    console.log("Error signing in.");
    return false;
  }
}

export default function SignIn() {
  // Clear session storage on page load (only once)
  React.useEffect(() => {
    sessionStorage.clear();
  }, []);

  //const [success, setSuccess] = React.useState(false);

  const handleSubmit = (event) => {
    // Prevent default behaviour
    event.preventDefault();

    // Get the form data
    const data = new FormData(event.currentTarget);

    // Send the data to the server
    sendSignIn(data);
    /* if (sendSignIn(data)) {
      setSuccess(true);
    } else {
      setSuccess(false);
    } */
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
      <Grid container sx={{ justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ my: 4, px: 4, borderRadius: "16px" }}
        >
          Sign In
        </Button>
      </Grid>

      {/* {success ? (
        <Grid container sx={{ justifyContent: "center" }}>
          <Alert variant="filled" severity="success">
            Login successful
          </Alert>
        </Grid>
      ) : (
        <Grid container sx={{ justifyContent: "center" }}>
          <Alert variant="filled" severity="info">
            Please enter your username or password.
          </Alert>
        </Grid>
      )} */}

      <Grid container sx={{ justifyContent: "center" }}>
        <Alert variant="filled" severity="success">
          Login successful
        </Alert>
      </Grid>
      <Grid container sx={{ justifyContent: "center" }}>
        <Alert variant="filled" severity="info">
          Please enter your username or password.
        </Alert>
      </Grid>
      <Grid container sx={{ justifyContent: "center" }}>
        <Alert variant="filled" severity="error">
          Please enter correct username or password.
        </Alert>
      </Grid>
    </Box>
  );
}
