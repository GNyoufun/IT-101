import * as React from "react";

import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";

import { SignIn, SignUp } from "../components";
import { Tab, TabsList } from "../style/style";
import banner from "../style/logo.svg";
import dTheme from "../style/theme";

const theme = dTheme;

export default function SignInUp() {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component='main'
        sx={{
          height: "100vh",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        {/* left hand side */}
        <Grid
          item
          xs={12}
          sm={7}
          md={7}
          lg={7}
          sx={{ my:2, textAlign: "center", alignItems: "center" }}
        >
          {/* our company name */}
          <Box
            sx={{
              display: "flex",
              mt: 2,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant='h2'>Game 101</Typography>
          </Box>

          <Box
            sx={{
              display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* banner image */}
            <img src={banner} width='90%' alt='Banner' />
          </Box>
        </Grid>

        {/* right hand side */}
        <Grid item xs={12} md={5} lg={5}>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Tabs for selecting login or sign up*/}
            <Box sx={{ bgcolor: "background.paper", borderRadius: "16px" }}>
              <Box
                sx={{
                  borderColor: "divider",
                  px: 6,
                  mt: 4,
                  pb: 4,
                  maxWidth: 450,
                }}
              >
                <TabsUnstyled defaultValue={0}>
                  <TabsList>
                    <Tab>Sign In</Tab>
                    <Tab>Sign Up</Tab>
                  </TabsList>
                  <TabPanelUnstyled value={0}>
                    <SignIn />
                  </TabPanelUnstyled>
                  <TabPanelUnstyled value={1}>
                    <SignUp />
                  </TabPanelUnstyled>
                </TabsUnstyled>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}