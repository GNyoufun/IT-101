import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SelectOutcome() {
  return (
    <FormControl>
      <FormLabel id="Win/Lose">Outcome</FormLabel>
      <RadioGroup
        row
        aria-labelledby="Win/Lose"
        name="position"
        defaultValue="Win"
      >
        <FormControlLabel value="Win" control={<Radio />} label="Win" />
        <FormControlLabel value="Draw" control={<Radio />} label="Draw" />
        <FormControlLabel value="Lose" control={<Radio />} label="Lose" />
      </RadioGroup>
    </FormControl>
  );
}
