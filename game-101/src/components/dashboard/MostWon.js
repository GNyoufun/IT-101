import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function MostWon() {
  return (
    <React.Fragment>
      <Title>Most Won Game</Title>
      <Typography component="p" variant="h4">
        LOL
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Win rate: 78%
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Detail
        </Link>
      </div>
    </React.Fragment>
  );
}
