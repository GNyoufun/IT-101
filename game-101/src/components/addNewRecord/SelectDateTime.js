import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { Grid, FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function SelectDateTime() {
  const [datetime, setValue] = React.useState(dayjs("2022-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        spacing={3}
        justifyContent='space-between'
        alignItems='flex-end'
      >
        <Grid item xs={12} sm={7.5} md = {7}>
          <FormControl fullWidth>
            <DesktopDatePicker
              label='Date'
              inputFormat='MM/DD/YYYY'
              value={datetime}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4.5} md = {5}>
          <FormControl fullWidth>
            <TimePicker
              label='Start Time'
              value={datetime}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
