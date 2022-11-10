import * as React from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Container, Fab, Grid, Paper, Typography } from "@mui/material";

export default function AddNewRecord() {
  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          p: 4,
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "center",
            flexDirection: "column",
          }}
          alignItems="center"
        >
          <Typography variant="h5">Add New Record</Typography>
          <Grid mt={3}>
            <Fab size="small" component={Link} to="/add-record">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
