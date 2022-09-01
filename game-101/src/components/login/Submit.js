import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

export default function Submit() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
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
      <p>Retrieve your password here:</p>
      <p>
        Enter your email address in the box below and click the submit button.
      </p>

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />

      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item>
          <Link href="#" variant="body2">
            {"Back to Login"}
          </Link>
        </Grid>
      </Grid>

      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ my: 4, px: 4, borderRadius: "16px" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
