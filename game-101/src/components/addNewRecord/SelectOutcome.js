import * as React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SelectOutcome(props) {
  const handleChange = (e) => {
    props.setInputs({ ...props.inputs, result: e.target.value });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="result">Result</InputLabel>
      <Select
        labelId="result"
        id="result"
        name="result"
        label="Result"
        value={props.inputs.result}
        onChange={handleChange}
      >
        <MenuItem value={"Win"}>Win</MenuItem>
        <MenuItem value={"Draw"}>Draw</MenuItem>
        <MenuItem value={"Lose"}>Lose</MenuItem>
      </Select>
    </FormControl>
  );
}
