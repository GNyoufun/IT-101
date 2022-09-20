import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SelectGameName(props) {
  const handleChange = (e) => {
    props.setInputs({ ...props.inputs, game_title: e.target.value });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='game'>Game</InputLabel>
      <Select
        labelId='game'
        id='game'
        label='game'
        value={props.inputs.game_title}
        onChange={handleChange}
      >
        <MenuItem value={"LOL"}>League of Legends</MenuItem>
        <MenuItem value={"FFXIV"}>Final Fantasy XIV</MenuItem>
        <MenuItem value={"Overwatch"}>Overwatch</MenuItem>
      </Select>
    </FormControl>
  );
}
const savedGameTitles = [
  { name: "League of Legends" },
  { name: "Overwatch" },
  { name: "Final Fantasy XIV" },
];
