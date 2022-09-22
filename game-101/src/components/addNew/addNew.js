import * as React from "react";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function AddNew() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose an option");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === "add-new-game") {
      setHelperText("add-new-game");
    } else if (value === "add-new-record") {
      setHelperText("add-new-record");
    } else {
      setHelperText("Please select an option.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormLabel id="add-new">
          Please choose what are you going to add...
        </FormLabel>
        <RadioGroup
          aria-labelledby="add-new"
          name="add-new"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="add-new-game"
            control={<Radio />}
            label="Add New Game"
          />
          <FormControlLabel
            value="add-new-record"
            control={<Radio />}
            label="Add New Record"
          />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button type="submit" variant="contained">
          Select
        </Button>
      </FormControl>
    </form>
  );
}
