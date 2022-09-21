import * as React from "react";
import { Grid, TextField, FormControl, Typography } from "@mui/material";

export default function SelectDurations(props) {
  const [hour, setHour] = React.useState(0);
  const [min, setMin] = React.useState(30);

  const handleHourChange = (e) => {
    const newHour = e.target.value === "" ? "" : Number(e.target.value);
    setHour(newHour);
    if (newHour < 0) {
      props.setInputs({ ...props.inputs, durations: 0 });
    } else if (newHour > 9) {
      props.setInputs({ ...props.inputs, durations: 9 * 60 });
    } else {
      props.setInputs({ ...props.inputs, durations: newHour * 60 + min });
    }
  };

  const handleMinChange = (e) => {
    const newMin = e.target.value === "" ? "" : Number(e.target.value);
    props.setInputs({ ...props.inputs, durations: newMin });
    setMin(newMin);
    if (newMin < 0) {
      props.setInputs({ ...props.inputs, durations: 0 });
    } else if (newMin > 59) {
      props.setInputs({ ...props.inputs, durations: newMin });
    } else {
      props.setInputs({ ...props.inputs, durations: newMin + hour * 60 });
    }
  };

  const handleBlurHour = () => {
    if (hour < 0) {
      setHour(0);
    } else if (hour > 12) {
      setHour(12);
    }
  };

  const handleBlurMin = () => {
    if (min < 0) {
      setMin(0);
    } else if (min > 59) {
      setHour(~~(min / 60));
      setMin(min % 60);
    }
  };

  return (
    <Grid container alignItems='center' justifyContent='space-between'>
      <Grid item xs={3} sm={3} sx={{ mb: [1] }}>
        <Typography component='legend' sx={{ wordBreak: "break-word" }}>
          Time length
        </Typography>
      </Grid>

      <Grid item xs={3.5} sm={3.5}>
        <FormControl fullWidth>
          <TextField
            id='Hour'
            label='Hour'
            type='number'
            value={hour}
            onChange={handleHourChange}
            onBlur={handleBlurHour}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                max: 12,
                min: 0,
              },
            }}
          />
        </FormControl>
      </Grid>
      <Grid item sm={0.5} sx={{ justifyContent: "center", my: 1 }}>
        :
      </Grid>

      <Grid item xs={4} sm={4}>
        <FormControl fullWidth>
          <TextField
            id='Min'
            label='Min'
            type='number'
            value={min}
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
