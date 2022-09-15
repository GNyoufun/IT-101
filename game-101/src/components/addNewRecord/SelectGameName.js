import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SelectGameName() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={topGames}
      renderInput={(params) => <TextField {...params} label="Game" />}
    />
  );
}

const topGames = ['League','Overwatch','Final Fantasy XIV'];
