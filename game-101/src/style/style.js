import { styled } from "@mui/system";
import { Button } from "@mui/material";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

const Tab = styled(TabUnstyled)`
font-family: IBM Plex Sans, sans-serif;
color: #88898A;
cursor: pointer;
font-size: 1.12rem;
font-weight: bold;
background-color: transparent;
width: 100%;
padding: 16px;
margin: 1px;
border: none;
border-radius: 12px;
display: flex;
justify-content: center;
&:hover {
  background-color: #3F4F73;
  color: #3071E8;
}
&:focus {
  color: #fff; 
}
&.${tabUnstyledClasses.selected} {
  color: #fff};
}
`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
background-color: #252E43;
border-radius: 16px;
margin-bottom: 28px;
display: flex;
align-items: center;
justify-content: center;
align-content: space-between;
`
);

const SubmitButton = styled(Button)({
  borderRadius: 50,
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 15py",
  border: "1px solid",
  lineHeight: 1.2,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#2581E2",
    borderColor: "#2581E2",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
  },
});

export { SubmitButton, TabsList, Tab };
