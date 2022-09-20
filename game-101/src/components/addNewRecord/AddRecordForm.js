import * as React from "react";
import dayjs from "dayjs";
import { Box, Container, Grid, Paper } from "@mui/material";
import {
  Comment,
  SubmitButton,
  SelectDate,
  SelectGameName,
  SelectOutcome,
  SelectTeammates,
  SelectDurations,
  SelectRating,
  SelectDifficulty,
} from "./";

export default function AddRecordFrom() {
  const defaultInput = {
    game_title: "",
    date: dayjs(),
    durations: 30,
    result: "",
    difficulty: 5,
    enjoyment: 6,
    team: [],
    comment: "",
  };
  const [inputs, setInputs] = React.useState(defaultInput);
  //.format('DD/MM/YYYY')
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
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
      onKeyPress={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
      noValidate
      autoComplete='off'
    >
      <Container maxWidth='sm' sx={{ mt: 8, mb: 4 }}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Grid container spacing={3} alignItems='center'>
            {/* Text */}
            <Grid item xs={12}>
              <SelectGameName inputs={inputs} setInputs={setInputs} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <SelectDate inputs={inputs} setInputs={setInputs} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <SelectDurations inputs={inputs} setInputs={setInputs} />
            </Grid>

            <Grid item xs={12} sm={9}>
              <SelectTeammates inputs={inputs} setInputs={setInputs} />
            </Grid>

            
            <Grid item xs={7} sm={3}>
              <SelectOutcome inputs={inputs} setInputs={setInputs} />
            </Grid>

            <SelectRating inputs={inputs} setInputs={setInputs} /> 

            <SelectDifficulty inputs={inputs} setInputs={setInputs} />

            <Grid item xs={12}>
              <Comment inputs={inputs} setInputs={setInputs} />
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
