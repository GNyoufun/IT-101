import * as React from "react";

import { Autocomplete, Chip, TextField } from "@mui/material";

export default function SelectTeammates(props) {
  const handleChange = (e, newValues) => {
    var formatValue = [];
    // loop for each teammate i
    for (let i = 0; i < newValues.length; i += 1) {
      var id_n_level = newValues[i].replace("lv.", "").split(" ");
      formatValue[i] = { in_game_id: id_n_level[1], level: id_n_level[0] };
    }
    props.setInputs({ ...props.inputs, team: formatValue});
  };


  const teammates = [
    { in_game_id: "Brendan", level: 3 },
    { in_game_id: "Ella", level: 3 },
    { in_game_id: "Ishaann", level: 3 },
    { in_game_id: "Jessica", level: 3 },
    { in_game_id: "Patrick", level: 3 },
  ];

  return (
    <Autocomplete
      multiple
      id="team"
      name="team"
      //freeSolo
      options={teammates.map(
        (option) => "lv." + option.level + " " + option.in_game_id
      )}
      onChange={handleChange}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField name="team" {...params} label="Teammates" placeholder="Enter Name" />
      )}
    />
  );
}
