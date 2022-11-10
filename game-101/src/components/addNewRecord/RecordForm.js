import * as React from "react";

import { Box, Button, Container, Grid, Paper } from "@mui/material";
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

/* router: /add-record */
export default function RecordForm(props) {
  // TODO: Check that the game date isn't in the future
  const [inputs, setInputs] = React.useState(props.defaultInput);
  const [files, setFiles] = React.useState([]);

  const handleSubmit = (event) => {
    // Prepare the data to send
    var sendData;
    sendData = { ...inputs, date: inputs.date.format("YYYY-MM-DD") };
    // Send the data
    props.sendReview(sendData, files);

    event.preventDefault();
    // TO DO: redirect or refresh
  };

  const getFiles = (e) => {
    e.preventDefault();
    setFiles([...files, e.target.files[0]]);
  };

  function onSelect(e) {
    if (e.files.length > 5) {
      alert("Only 5 files accepted.");
      e.preventDefault();
    }
  }

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
          <props.title />

          <Grid container spacing={3} sx={{ alignItems: "center" }}>
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
            <Grid item xs={12} sm={4.5} md={4}>
              <Button variant="contained" component="label">
                Upload Image
                <input
                  name="images"
                  type="file"
                  accept="image/*"
                  hidden
                  multiple
                  onChange={getFiles}
                />
              </Button>
            </Grid>

            {/* image preview */}
            <Grid item xs={12} sm={7.5} md={8}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  borderRadius: 1,
                  padding: "4px",
                }}
              >
                {files.map((img, index) => (
                  <img
                    border={2}
                    style={{
                      maxHeight: "40px",
                      maxWidth: "60px",
                      margin: 2,
                      borderRadius: 2,
                      borderColor: '#3071E8'
                    }}
                    src={URL.createObjectURL(img)}
                    key={index}
                  />
                ))}
              </Box>
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
