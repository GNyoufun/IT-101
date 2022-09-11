import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

import { SubmitButton } from "../addNewRecord";

export const ChangeDetails = (props) => {
  const [values, setValues] = useState({
    email: "address@email.com",
    username: "Username",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="Update Email" title="Email Address" />
        <Divider />
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <SubmitButton />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="Update Username" title="Username" />
        <Divider />
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                onChange={handleChange}
                required
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <SubmitButton />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="Update Password" title="Password" />
        <Divider />
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                name="curPassword"
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />

              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                required
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <SubmitButton />
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};
