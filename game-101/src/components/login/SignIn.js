import * as React from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch("http://localhost:4000/users/login", {
      method: "GET",
      headers: {
        "username": data.get("username"),
        "password": data.get("password")
      },
    })
      .then((res) => res.text())
      .then(data=>{ console.log(data); })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box
      noValidate
      onSubmit={handleSubmit}
      component='form'
      sx={{
        bgcolor: "background.paper",
        mb: 2,
      }}
    >
      <Box sx={{ my: 2 }}>
        <Typography variant='h4'>Welcome</Typography>
        <Typography variant='h6'>Sign in to continue!</Typography>
      </Box>

      <TextField
        margin='normal'
        required
        fullWidth
        id='username'
        label='Username'
        name='username'
        autoComplete='username'
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
      />

      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        sx={{ my: 1 }}
      >
        <Grid item xs>
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
        </Grid>
      </Grid>

      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item>
          <Button
            type='submit'
            variant='contained'
            size='large'
            sx={{ my: 3, px: 4, borderRadius: "16px" }}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
