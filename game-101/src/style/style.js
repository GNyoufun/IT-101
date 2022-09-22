import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { TabUnstyled, tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { styled } from "@mui/system";

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

export { TabsList, Tab };
