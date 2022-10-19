import * as React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { GetAllGames, GetGameNames } from "../apiRequest/DataStorage";

export default function SelectGameName(props) {
  const savedGameTitles = [
    // TO DO: change to GET request
    { "GameTitle": "League of Legends",  "GameType": "MOBA" },
    { "GameTitle": "Overwatch",  "GameType": "FPS"  },
    { "GameTitle": "Final Fantasy XIV" ,  "GameType": "MMORPG" },
  ];

  const [gameNames, setGameNames] = React.useState([]);
  

  async function retrieveGameNames() {
    GetGameNames().then((gameNames) => {
      // All the data is available, set it
      console.log(gameNames);
      setGameNames(gameNames);
    });
  }

  // Only run once
  React.useEffect(() => {
    setGameNames(savedGameTitles);
    retrieveGameNames();
  }, []);


  const handleChange = (e) => {
    props.setInputs({ ...props.inputs, GameTitle: e.target.value });
  };

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
