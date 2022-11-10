import * as React from "react";

import { Autocomplete, Chip, TextField } from "@mui/material";
import { GetTeammatesForGame } from "../apiRequest/DataStorage";

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

  // need to change
  const [teammates, setTeammates] = React.useState([{InGameID: "Loading...", Level: 1}]);

  // On load, update the teammates
  React.useEffect(() => {
    console.log("Updating teammates");
    console.log(props.inputs.GameTitle);
    // Get the teammates
    GetTeammatesForGame(props.inputs.GameTitle).then((teammates) => {
      console.log(teammates);
      setTeammates(teammates);
    });
  }, [props.inputs.GameTitle]);

  return (
    <Autocomplete
      multiple
      id="team"
      name="team"
      freeSolo
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
        <TextField name="team" {...params} label="Teammates" placeholder="Enter 'lv.__ username'" />
      )}
      value={
        props.inputs.team.map(
          (option) => "lv." + option.Level + " " + option.InGameID
        )}
    />
  );
}
