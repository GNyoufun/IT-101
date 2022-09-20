import * as React from "react";
import {Grid, TextField, FormControl, Typography } from "@mui/material";

export default function SelectTimeLength() {

  const [hour, setHour] = React.useState(0);
  const [min, setMin] = React.useState(30);

  const handleHourChange = (event) => {
    setHour(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleMinChange = (event) => {
    setMin(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlurHour = () => {
    if (hour < 0) {
      setHour(0);
    } else if (hour > 9) {
      setHour(9);
    }
  };

  const handleBlurMin = () => {
    if (min < 0) {
      setMin(0);
    } else if (min > 59) {
      setHour(~~(min / 60));
      setMin(min % 60);
      console.log(min);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={12} sm={3.5} sx={{mb:[1]}}>
        <Typography component='legend' sx={{wordBreak:'break-word'}}>Time Length</Typography>
      </Grid>

      <Grid item xs={5.5} sm={3.5}>
        <FormControl fullWidth >
          <TextField
            id='Hour'
            label='Hour'
            type='number'
            value={hour}
            onSubmit={handleHourChange}
            onChange={handleHourChange}
            onBlur={handleBlurHour}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                max: 9,
                min: 0,
              },
            }}
          />
        </FormControl>
      </Grid>
      <Grid item sm={0.5} sx={{ justifyContent: "center", my: 1 }}>
        :
      </Grid>

      <Grid item xs={5.5} sm={4}>
        <FormControl fullWidth>
          <TextField
            id='Min'
            label='Min'
            type='number'
            value={min}
            onSubmit={handleMinChange}
            onChange={handleMinChange}
            onBlur={handleBlurMin}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                max: 59,
                min: 0,
              },
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
