import * as React from "react";

import dayjs from "dayjs";

import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import { SubmitButton } from "../../style/style";
import {
  Comment,
  SelectDate,
  SelectGameName,
  SelectOutcome,
  SelectTeammates,
  SelectDurations,
  SelectRating,
  SelectDifficulty,
} from "./";

/* router: /add-record */
export default function AddRecordForm() {
  const defaultInput = {
    game_title: "",
    date: dayjs(),
    durations: 30,
    result: "Draw",
    difficulty: 5,
    enjoyment: 6,
    team: [],
    comment: "",
  };
  const [inputs, setInputs] = React.useState(defaultInput);

  const handleSubmit = (event) => {
    convertInputs();
    console.log(inputs);
    event.preventDefault();
  };

  const convertInputs = () => {
    // convert date format
    inputs["date"] = inputs["date"].format("DD/MM/YYYY");
    // convert teammate format
    for (let i = 0; i < inputs["team"].length; i += 1) {
      for (let j = 0; j < inputs["team"][i].length; j += 1) {
        var temp = inputs["team"][i].replace("lv.", "").split(": ");
        inputs["team"][i] = { in_game_id: temp[1], level: temp[0] };
      }
    }
  };

  return (
    <Box
      component="form"
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
      autoComplete="off"
    >
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Box sx={{ my: 3 }}>
            <Typography variant="h4">Add New Raid Record</Typography>
          </Box>

          <Grid container spacing={3} alignItems="center">
            {/* Select Game */}
            <Grid item xs={12}>
              <SelectGameName inputs={inputs} setInputs={setInputs} />
            </Grid>

            {/* Select Date */}
            <Grid item xs={12} sm={6}>
              <SelectDate inputs={inputs} setInputs={setInputs} />
            </Grid>

            {/* Select Game Duration */}
            <Grid item xs={12} sm={6}>
              <SelectDurations inputs={inputs} setInputs={setInputs} />
            </Grid>

            {/* Select Teammates */}
            <Grid item xs={12} sm={9}>
              <SelectTeammates inputs={inputs} setInputs={setInputs} />
            </Grid>

            {/* Select Result */}
            <Grid item xs={7} sm={3}>
              <SelectOutcome inputs={inputs} setInputs={setInputs} />
            </Grid>

            {/* Rating for Enjoyment */}
            <SelectRating inputs={inputs} setInputs={setInputs} />

            {/* Select Difficulty */}
            <SelectDifficulty inputs={inputs} setInputs={setInputs} />

            {/* Write Comments */}
            <Grid item xs={12}>
              <Comment inputs={inputs} setInputs={setInputs} />
            </Grid>

            {/* Upload Image */}
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Image
                <input type="file" accept="image/*" hidden />
              </Button>
            </Grid>

            <Grid container xs={12} sx={{ mt: 4, justifyContent: "center" }}>
              <SubmitButton variant="contained" type="submit">
                Submit
              </SubmitButton>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
