import  React, { useState, useEffect } from "react";

import { Box, Container, Grid, Paper } from "@mui/material";

import { MostWon, RecentRaids, TimeSpent, TimeSpentEach } from ".";
import { GetDashboardContent } from "../apiRequest/DataStorage";
import Loading from "../apiRequest/DataStorage";

export default function DashboardContent() {

  const [loading, setLoading] = useState(true);
  // const [games, setAllGames] = useState(GAMES);

  async function retrieveDashboard() {
    GetDashboardContent().then((dashboardContent) => {
      // All the data is available, set it
      //setData(dashboardContent.RecentRaids);
      console.log(dashboardContent);
      setLoading(false);
    });
  }

  // Only run once
  useEffect(() => {
    retrieveDashboard();
  }, []);

  return (
    <Container>
      {loading ? (
        Loading()) : (
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
            <Grid item xs={12} sm={6} md={3.2} lg={3}>
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
            <Grid item xs={12} sm={6} md={3} lg={3}>
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
            <Grid item xs={12} md={5.8} lg={6}>
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
      </Box>)}
    </Container>
  );
}
