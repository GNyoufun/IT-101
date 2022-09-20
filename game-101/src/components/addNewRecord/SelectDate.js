import * as React from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";

export default function SelectDate(props) {
  const handleChange = (newDate) => {
    props.setInputs({ ...props.inputs, date: newDate});
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormControl fullWidth>
            <DesktopDatePicker
              label='Date'
              inputFormat='DD/MM/YYYY'
              mask="__/__/____"
              value={props.inputs.date}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
    </LocalizationProvider>
  );
}
