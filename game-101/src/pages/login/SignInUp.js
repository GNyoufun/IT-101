import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import banner from "../../logo.svg";
import dTheme from "../../theme";
import {TabsList, Tab} from '../../style'
import {SignIn, SignUp} from "../../components";


const theme = dTheme;

export default function SignInUp() {
  return (
    <ThemeProvider theme={theme}>
      
      <Grid container component='main' sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* left hand side */}
        <Grid
          item
          xs={12}
          md={7}
          lg={7}
          sx={{ textAlign: "center", mt: 6, display: "flex"}}
        >
          <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", my:2}}>
            {/* our company name */}
            <Typography variant='h2'> IT 101 </Typography>
            {/* banner image */}
            <img src={banner} width="90%" alt='Banner' /> 
          </Box>
        </Grid>

        {/* right hand side */}
        <Grid item xs={12} md={5} lg={5}>
          <Box
            sx={{
              my: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Tabs for selecting login or sign up*/}
            <Box sx={{ bgcolor: "background.paper", borderRadius: '16px'}}>
              <Box sx={{borderColor: "divider", px: 6, mt:4, pb: 4, maxWidth: 440 }}>
                <TabsUnstyled defaultValue={0}>
                  <TabsList>
                    <Tab>Log in</Tab>
                    <Tab>Sign Up</Tab>
                  </TabsList>
                  <TabPanelUnstyled value={0}><SignIn /></TabPanelUnstyled>
                  <TabPanelUnstyled value={1}><SignUp /></TabPanelUnstyled>
                </TabsUnstyled>
              </Box>
            </Box>
            
          </Box>
        </Grid>

      </Grid>
    </ThemeProvider>
  );
}

