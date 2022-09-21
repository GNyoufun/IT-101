import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function SelectGameName(props) {
  const handleChange = (e) => {
    props.setInputs({ ...props.inputs, game_title: e.target.value });
  };

  const savedGameTitles = [
    { game_title: "League of Legends" },
    { game_title: "Overwatch" },
    { game_title: "Final Fantasy XIV" },
  ];

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
        {savedGameTitles.map((option) => (
          <MenuItem value={option.game_title}>{option.game_title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
