import * as React from "react";

import { Box, Container, Grid, Paper } from "@mui/material";

import { MostWon, RecentRaids, TimeSpent, TimeSpentEach } from ".";

export default function DashboardContent() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 8, mb: 2 }}>
        <Grid container spacing={4}>
          {/* Text */}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <MostWon />
            </Paper>
          </Grid>

          {/* Chart */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <TimeSpent />
            </Paper>
          </Grid>

          {/* Chart */}
          <Grid item xs={12} md={5} lg={5}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <TimeSpentEach />
            </Paper>
          </Grid>

          {/* Recent Raids */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <RecentRaids />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
