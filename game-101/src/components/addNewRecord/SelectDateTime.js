import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function SelectDateTime() {
  const [value, setValue] = React.useState(dayjs("2022-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={5}>
          <DesktopDatePicker
            label='Date'
            inputFormat='MM/DD/YYYY'
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TimePicker
            label='Start Time'
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
