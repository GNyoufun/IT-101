import * as React from "react";

import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Box, Container, Fab, Grid, Paper, Typography } from "@mui/material";

export default function DisableElevation() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 2,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 20 }}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Grid
            container
            sx={{ justifyContent: "center", flexDirection: "column" }}
            alignItems="center"
          >
            <Typography variant="h5">Add New Game</Typography>
            <Fab size="small" component={Link} to="/add-game">
              <AddIcon />
            </Fab>
          </Grid>
        </Paper>
      </Container>
      <Container maxWidth="sm" sx={{ mt: 20 }}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Grid
            container
            sx={{ justifyContent: "center", flexDirection: "column" }}
            alignItems="center"
          >
            <Typography variant="h5">Add New Record</Typography>
            <Fab
              color="secondary"
              size="small"
              component={Link}
              to="/add-record"
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
