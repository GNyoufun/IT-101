


import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function SelectRating() {


  return (
      <Grid item xs={12} sm={2.5}>

        <Typography component="legend" sx={{mb:1}}>Enjoyment</Typography>
        <Rating name="rating" defaultValue={2.5} precision={0.5} />

      </Grid>

  );




}
