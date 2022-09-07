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
    text: {
      secondary: '#949BB2',
      primary: '#d5d5e0',
    },
    divider: '#282C3F',
  },
  // customise side bar buttons
  components: {
    MuiListItemButton: {
      defaultProps: {
        sx:{
          "&.Mui-selected": {
            borderLeft: 4,
            borderColor: "#0FC3CE",
            backgroundColor: "#2C344A",
          },
        }
      },
    },
  }
});

export default dTheme;
