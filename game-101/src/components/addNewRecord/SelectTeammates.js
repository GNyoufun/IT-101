import * as React from "react";

import { Autocomplete, Chip, TextField } from "@mui/material";

export default function SelectTeammates(props) {
  const handleChange = (e, newValues) => {
    var formatValue = [];
    // loop for each teammate i
    for (let i = 0; i < newValues.length; i += 1) {
      var id_n_level = newValues[i].replace("lv.", "").split(" ");
      formatValue[i] = { InGameID: id_n_level[1], Level: id_n_level[0] };
    }
    props.setInputs({ ...props.inputs, team: formatValue});
  };


  const teammates = [
    { InGameID: "Brendan", Level: 3 },
    { InGameID: "Ella", Level: 3 },
    { InGameID: "Ishaann", Level: 3 },
    { InGameID: "Jessica", Level: 3 },
    { InGameID: "Patrick", Level: 3 },
  ];

  return (
    <Autocomplete
      multiple
      id="team"
      name="team"
      //freeSolo
      options={teammates.map(
        (option) => "lv." + option.Level + " " + option.InGameID
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
