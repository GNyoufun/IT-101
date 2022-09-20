import * as React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Slider from "@mui/material/Slider";

export default function SelectDifficulty(props) {
  const handleChange = (e, newValue) => {
    props.setInputs({ ...props.inputs, difficulty: newValue });
  };

  const marks = [
    {
      value: 1,
      label: "Easy",
    },
    {
      value: 5,
      label: "Medium",
    },
    {
      value: 9,
      label: "Hard",
    },
  ];

  return (
    <Grid item xs={12} sm={8.5}>
      <Typography component='legend'>Difficulty</Typography>
      <Box sx={{ ml: 2 }}>
        <Slider
          aria-label='Difficulty'
          defaultValue={5}
          step={1}
          valueLabelDisplay='auto'
          onChange={handleChange}
          marks={marks}
          min={1}
          max={10}
        />
      </Box>
    </Grid>
  );
}
