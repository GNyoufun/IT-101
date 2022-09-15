import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Grid, Select } from "@mui/material";

export default function SelectOutcome() {
  const [result, setResult] = React.useState("");

  const handleChange = (event) => {
    setResult(event.target.value);
  };

  return (
    <Grid item xs={12} sm={4.5} md={2}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Result</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={result}
          label='Result'
          onChange={handleChange}
        >
          <MenuItem value={1}>Win</MenuItem>
          <MenuItem value={2}>Draw</MenuItem>
          <MenuItem value={3}>Lose</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}
