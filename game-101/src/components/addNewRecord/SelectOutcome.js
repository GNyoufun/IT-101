import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Grid, Select } from "@mui/material";

export default function SelectOutcome(props){
  const handleChange = (e) => {
    props.setInputs({result: e.target.value});
  };

  return (
    <Grid item xs={12} sm={4.5} md={2.5}>
      <FormControl fullWidth>
        <InputLabel id='result'>Result</InputLabel>
        <Select
          labelId='result'
          id='result'
          label='Result'
          value={props.result}
          onChange={handleChange}
        >
          <MenuItem value={"Win"}>Win</MenuItem>
          <MenuItem value={"Draw"}>Draw</MenuItem>
          <MenuItem value={"Lose"}>Lose</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};
