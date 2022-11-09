import * as React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { GetGameNames } from "../apiRequest/DataStorage";

export default function SelectGameName(props) {
  const savedGameTitles = ["Loading..."];

  const [gameNames, setGameNames] = React.useState(savedGameTitles);
  

  async function retrieveGameNames() {
    GetGameNames().then((gameNames) => {
      // All the data is available, set it
      console.log(gameNames);
      setGameNames(gameNames);
    });
  }

  // Only run once
  React.useEffect(() => {
    retrieveGameNames();
  }, []);


  const handleChange = (e) => {
    props.setInputs({ ...props.inputs, GameTitle: e.target.value });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="game">Game</InputLabel>
      <Select
        labelId="game"
        id="game"
        name="GameTitle"
        label="Game"
        value={props.inputs.GameTitle}
        onChange={handleChange}
      >
        {gameNames.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
