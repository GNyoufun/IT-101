import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const dTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3071E8",
      contrastText: "#d5d5e0",
    },
    secondary: {
      main: "#0FC3CE",
    },
    background: {
      paper: "#151e34",
      default: "#080c24",
    },
    text: {
      secondary: "#949BB2",
      primary: "#c2c9de",
      disabled: "rgba(95,92,154,0.5)",
      hint: "#AEB6D0",
    },
    divider: "#282c3f",
  },
  // customise side bar buttons
  components: {
    MuiListItemButton: {
      defaultProps: {
        sx: {
          "&.Mui-selected": {
            borderLeft: 4,
            borderColor: "#0FC3CE",
            backgroundColor: "#2C344A",
          },
        },
      },
    },
  },
});

export default dTheme;
