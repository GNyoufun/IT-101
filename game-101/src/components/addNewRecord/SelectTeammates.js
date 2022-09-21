import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SelectTeammates(props) {

  const handleChange = (e, newValues) => {
    props.setInputs({...props.inputs, team: newValues});
  }
  
  const teammates = [
    { in_game_id: 'Brendan'},
    { in_game_id: 'Ella'},
    { in_game_id: 'Ishaann'},
    { in_game_id: 'Jessica' },
    { in_game_id: 'Patrick'},
  ];

  return (
      <Autocomplete
        multiple
        id="tags-filled"
        options={teammates.map((option) => option.in_game_id)}
        freeSolo
        onChange={handleChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
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



