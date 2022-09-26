import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
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
    <form autoComplete='off' noValidate {...props}>
      <Box
        component='form'
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
        autoComplete='off'
      >
        <Grid container sx={{ m: 4 }}>
          <Grid
            container
            maxWidth='md'
            xs={11}
            md={7}
            spacing={3}
            alignItems='center'
          >
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <CardHeader title='Email Address' />
                <Divider />
                <CardContent>
                  <Grid item md={8} xs={12}>
                    <TextField
                      fullWidth
                      label='Email Address'
                      name='email'
                      onChange={handleChange}
                      required
                      value={values.email}
                      variant='outlined'
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <CardHeader title='Username' />
                <Divider />
                <CardContent>
                  <Grid item md={8} xs={12}>
                    <TextField
                      fullWidth
                      label='Username'
                      name='username'
                      onChange={handleChange}
                      required
                      value={values.username}
                      variant='outlined'
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <CardHeader subheader='Update Password' title='Password' />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    justifyContent='space-between'
                    alignItems='flex-end'
                  >
                    <Grid item md={8} sm={12}>
                      <TextField
                        fullWidth
                        label='Current Password'
                        name='curPassword'
                        onChange={handleChange}
                        required
                        variant='outlined'
                        margin='normal'
                      />
                      <TextField
                        fullWidth
                        label='New Password'
                        name='newPassword'
                        onChange={handleChange}
                        required
                        variant='outlined'
                        margin='normal'
                      />
                      <TextField
                        fullWidth
                        label='Confirm Password'
                        name='confirmPassword'
                        onChange={handleChange}
                        required
                        variant='outlined'
                        margin='normal'
                      />
                    </Grid>
                    <Grid item md={3.2} sm={12} sx={{ mt: 2, mb: 1 }}>
                      <SubmitButton />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid
            item
            sm={12}
            md={5}
            alignItems='center'
            justifyContent='center'
            sx={{
              display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
            }}
          >
            <img src={security} width='70%' alt='Banner' />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
