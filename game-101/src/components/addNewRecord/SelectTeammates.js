import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SelectTeammates() {
  return (
      <Autocomplete
        multiple
        id="tags-filled"
        options={teammates.map((option) => option.name)}
        freeSolo
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


const teammates = [
  { name: 'Brendan'},
  { name: 'Ella'},
  { name: 'Ishaann'},
  { name: 'Jessica' },
  { name: 'Patrick'},
];
