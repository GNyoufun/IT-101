import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const dTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3071E8',
    },
    secondary: {
      main: '#0FC3CE',
    },
    background: {
      default: '#080C24',
      paper: '#151E34',
    },
  },
});

export default dTheme;
