import * as React from "react";

import dayjs from "dayjs";

import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import { SubmitButton } from "../../style/buttonStyle";
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
import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

// Sends a new record to the server
async function sendNewReview(sendData) {
  var response = await GetAuthorizedResponse("/users/{user_id}/reviews", "POST", JSON.stringify(sendData));
  
  if (response.status === 200) {
    // Review successfully added, redirect to the home page
    // TODO: Use a React Router redirect
    // TODO: Decide on redirect location? Reviews or Home?
    window.location.href = "/";
    return true;
  } else {
    console.log("Error adding new raid.");
    return false;
  }
}

/* router: /add-record */
export default function AddRecordForm() {
  // TODO: Check that the game date isn't in the future
  const defaultInput = {
    // TODO: add UserId
    GameTitle: "", // TODO: Get first game in list
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
    /*
    const data = new FormData(event.currentTarget);
    sendData = {
      GameTitle: data.get("GameTitle"),
      date: data.get("date"),
      result: data.get("result"),
      difficulty: data.get("difficulty"),
      enjoyment: data.get("rating"),
      team: data.get("team")
    };
    console.log(sendData);
    */

    // Prepare the data to send
    var sendData;
    sendData = { ...inputs, date: inputs.date.format("MM/DD/YYYY") };
    // print for testing
    console.log(sendData);
  
    // Change "enjoyment" to "rating"
    sendData.rating = sendData.enjoyment;
    delete sendData.enjoyment;
  
    // Change "comment" to "comments"
    sendData.comments = sendData.comment;
    delete sendData.comment;

    // Change "in_game_id" to "InGameID" and "level" to "Level" for each teammate
    sendData.team.forEach((teammate) => {
      teammate.InGameID = teammate.in_game_id;
      delete teammate.in_game_id;
      teammate.Level = teammate.level;
      delete teammate.level;
    });

    // Send the data
    sendNewReview(sendData);

    event.preventDefault();
    // TO DO: redirect or refresh
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
                <input
                  name="images"
                  type="file"
                  accept="image/*"
                  hidden
                  multiple
                />
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid container sx={{ mt: 4, justifyContent: "center" }}>
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
