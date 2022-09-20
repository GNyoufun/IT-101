import * as React from "react";
import { Box, Container, Grid, Paper } from "@mui/material";
import {
  Comment,
  SubmitButton,
  SelectDateTime,
  SelectGameName,
  SelectOutcome,
  SelectTeammates,
  SelectTimeLength,
  SelectRating,
  SelectDifficulty,
} from "./";

export default function AddRecordFrom() {
  const [inputs, setInputs] = React.useState({result:""});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({result: inputs.result});
  };

  return (
    <Box
      component='form'
      sx={{
        flexGrow: 2,
        height: "100vh",
        overflow: "auto",
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Container maxWidth='md' sx={{ mt: 8, mb: 4 }}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Grid container spacing={3} alignItems='center'>
            {/* Text */}
            <Grid item xs={12} md={6} >
              <SelectGameName />
            </Grid>

            <Grid item xs={12} md={6}>
              <SelectDateTime />
            </Grid>

            <Grid item xs={12} sm={7.5} md={3.5}>
              <SelectTimeLength />
            </Grid>
            <SelectOutcome result={inputs.result} setInputs={setInputs}/>
            
            <SelectDifficulty />
            <SelectRating />

            <Grid item xs={12} md={6}>
              <SelectTeammates />
            </Grid>

            <Grid item xs={12} md={6}>
              <Comment />
            </Grid>

            <Grid container xs={12} sx={{ mt: 4, justifyContent: "center" }}>
              <SubmitButton />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
