import * as React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { GetGameNames } from "../apiRequest/DataStorage";

export default function SelectGameName(props) {
  const handleChange = (e) => {
    props.setInputs({ ...props.inputs, GameTitle: e.target.value });
  };

  const savedGameTitles = [
    // TO DO: change to GET request
    { "GameTitle": "League of Legends",  "GameType": "MOBA" },
    { "GameTitle": "Overwatch",  "GameType": "FPS"  },
    { "GameTitle": "Final Fantasy XIV" ,  "GameType": "MMORPG" },
  ];

  /*
  GetGameNames().then((response) => {
    savedGameTitles = response;
  });
  */

  return (
    <FormControl fullWidth>
      <InputLabel id="game">Game</InputLabel>
      <Select
        labelId="game"
        id="game"
        name="GameTitle"
        label="Game Name"
        value={props.inputs.GameTitle}
        onChange={handleChange}
      >
        {savedGameTitles.map((option) => (
          <MenuItem key={option.GameTitle} value={option.GameTitle}>
            {option.GameTitle}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
