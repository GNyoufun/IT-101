import * as React from "react";

import { Grid, Rating, Typography } from "@mui/material";

export default function SelectRating(props) {
  const handleChange = (e, newValue) => {
    props.setInputs({ ...props.inputs, rating: Number(newValue * 2) });
  };

  return (
    <Grid item xs={5} sm={3.5}>
      <Typography component="legend" sx={{ mb: 1 }}>
        Enjoyment
      </Typography>
      <Rating
        name="rating"
        defaultValue={3}
        precision={0.5}
        onChange={handleChange}
      />
    </Grid>
  );
}
