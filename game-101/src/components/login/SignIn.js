import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      noValidate
      onSubmit={handleSubmit}
      sx={{
        bgcolor: "background.paper",
        mb: 2,
      }}
    >
      <Box sx={{ my: 2}}>
        <Typography variant='h4'>Welcome,</Typography>
        <Typography variant='h6'>Sign in to continue!</Typography>
      </Box>

      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
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