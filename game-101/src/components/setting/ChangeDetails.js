import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

import { SubmitButton } from "../addNewRecord";
import security from "../../style/security.svg";

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
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Email Address" />
                  <Divider />
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
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
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Username" />
                  <Divider />
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
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
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardHeader subheader="Update Password" title="Password" />
                  <Divider />
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
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
              </Grid>
            </Grid>
          </Container>
          <Box
            sx={{
              display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={security} width="70%" alt="Banner" />
          </Box>
        </Stack>
      </Box>
    </form>
  );
};
