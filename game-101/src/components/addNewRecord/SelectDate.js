import * as React from "react";

import { FormControl, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function SelectDate(props) {
  const handleChange = (newDate) => {
    props.setInputs({ ...props.inputs, date: newDate });
  };
  // TODO: Force date to be in the past
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth name="date">
        <DesktopDatePicker
          
          label="Date"
          inputFormat="DD/MM/YYYY"
          mask="__/__/____"
          value={props.inputs.date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormControl>
    </LocalizationProvider>
  );
}
