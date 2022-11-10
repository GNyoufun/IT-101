import { useState } from "react";

import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
} from "@mui/material";

import security from "../../style/security.svg";
import { DeleteButton, SubmitButton } from "../../style/buttonStyle";
import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

/* router: /setting */
export const ChangeDetails = (props) => {
  const [successfulChange, setSuccessfulChange] = useState(null);

  // Sends a password change to the API
  async function sendPasswordChange(passwordChange) {
    var response = GetAuthorizedResponse("/users/{user_id}", "PUT", JSON.stringify(passwordChange));
    await response.then((response) => {

      if (response.status === 200) {
        setSuccessfulChange(true);
      } else {
        setSuccessfulChange(false);
      }
    });
  }

  // Handle Password Change
  const handlePasswordChange = (event) => {
    event.preventDefault();

    console.log(event);

    // Get the form data
    const data = new FormData(event.currentTarget);

    // Check that the new password is confirmed
    if (data.get("newPassword") !== data.get("confirmPassword")) {
      setSuccessfulChange("MATCH_ERROR");
      return;
    }

    // Create an object with the old and new passwords
    var passwordChange = {
      password: data.get("currentPassword"),
      newPassword: data.get("newPassword"),
      username: sessionStorage.getItem("user_name"),
    };

    console.log(passwordChange);

    // Send the data to the server
    sendPasswordChange(passwordChange);
    
    
    // Call the API to change the password
    //sendPasswordChange("[NEW PASSWORD]"); // TODO: Get the new password from the form
  }

  // Handle Delete Account
  const handleDeleteAccount = (event) => {
    event.preventDefault();

    console.log(event);



    // Call the API to delete the account
    //sendDeleteAccount(); // TODO: Send the delete account request
  }

  return (
      <Box
        component="form"
        display="flex"
        sx={{
          height: "100vh",
          overflow: "auto",
        }}
        onSubmit={handlePasswordChange}
      >
        <Grid container sx={{ m: 4 }}>
          <Grid
            container
            maxWidth="md"
            xs={12}
            md={7}
            spacing={3}
            alignItems="center"
          >
            {/* Display username */}
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <CardHeader title="Username" />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <Grid item md={8} sm={9}>
                      <TextField
                        fullWidth
                        label="Username"
                        id="username"
                        name="username"
                        value={sessionStorage.getItem("user_name")}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={3.2} sm={2.4} sx={{ mt: 2, mb: 1 }}>
                      {/* <SubmitButton variant="contained" type="submit">
                        Submit
                      </SubmitButton> */}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Change Password */}
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <CardHeader subheader="Update Password" title="Password" />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    {/* Enter current password */}
                    <Grid item md={8} sm={9}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        id="currentPassword"
                        name="currentPassword"
                        required
                        variant="outlined"
                        margin="normal"
                        type="password"
                        autoComplete="off"
                      />
                      {/* Enter new password */}
                      <TextField
                        fullWidth
                        label="New Password"
                        id="newPassword"
                        name="newPassword"
                        required
                        variant="outlined"
                        margin="normal"
                        type="password"
                        autoComplete="off"
                      />
                      {/* Confirm new password */}
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        variant="outlined"
                        margin="normal"
                        type="password"
                        autoComplete="off"
                      />
                    </Grid>

                    <Grid item md={3.2} sm={2.4} sx={{ mt: 2, mb: 1 }}>
                      <SubmitButton
                        variant="contained"
                        type="submit"
                       
                      >
                        Submit
                      </SubmitButton>
                    </Grid>
                    {successfulChange === false ? (
                      <Grid sx={{ mt: 2, mb: 1 }}>
                        <Alert variant="filled" severity="error">
                          Password change failed: Incorrect password.
                      </Alert>
                    </Grid>
                    ) : (null)}
                    {successfulChange === "MATCH_ERROR" ? (
                    <Grid sx={{ mt: 2, mb: 1 }}>
                      <Alert variant="filled" severity="error">
                        New password does not match confirmation.
                        </Alert>
                      </Grid>
                    ) : null}
                    {successfulChange === true ? (
                      <Grid sx={{ mt: 2, mb: 1 }}>
                        <Alert variant="filled" severity="success">
                          Password change succeeded.
                        </Alert>
                      </Grid>
                    ) : null}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Delete User */}
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <CardHeader title="Delete My Account" />
                <Divider />
                <CardContent>
                  <FormControlLabel
                    value="delete-account"
                    control={<Radio />}
                    label="By clicking this, I understand I my account will be permanently deleted."
                  />
                  <Grid mt={2}>
                    <DeleteButton variant="contained">
                      Delete My Account
                    </DeleteButton>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid
            item
            sm={12}
            md={5}
            alignItems="center"
            justifyContent="center"
            sx={{
              display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
            }}
          >
            <img src={security} width="70%" alt="Banner" />
          </Grid>
        </Grid>
      </Box>
  );
};
