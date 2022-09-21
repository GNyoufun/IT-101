import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SelectTeammates(props) {

  const handleChange = (e, newValues) => {
    props.setInputs({...props.inputs, team: newValues});
  }

  const teammates = [
    { in_game_id: 'Brendan', level: 3},
    { in_game_id: 'Ella', level: 3},
    { in_game_id: 'Ishaann', level: 3},
    { in_game_id: 'Jessica', level: 3},
    { in_game_id: 'Patrick', level: 3},
  ];

  return (
      <Autocomplete
        multiple
        id="team"
        //freeSolo
        options={teammates.map((option) => ('lv.' + option.level + ' ' + option.in_game_id))}
        onChange={handleChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({index})} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Teammates"
            placeholder="Enter Name"
          />
        )}
      />
  );
}



