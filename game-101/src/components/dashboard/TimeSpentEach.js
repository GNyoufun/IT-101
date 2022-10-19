import * as React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";

import { useTheme } from "@mui/material/styles";

import Title from "./Title";
import { GetDashboardContent } from "../apiRequest/DataStorage";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("03-11", 0.2),
  createData("03-12", 1.2),
  createData("03-13", 1.2),
  createData("03-14", 0),
  createData("03-15", 1.4),
  createData("03-16", 3.1),
  createData("03-17", 3.6),
];

console.log(data);

export default function TimeSpentEach() {
  const theme = useTheme();

  // Set the data
  const [data, setData] = React.useState([]);


  async function retrieveTimeSpentEach() {
    GetDashboardContent().then((dashboardContent) => {
      // All the data is available, set it
      //setData(dashboardContent.RecentRaids);
      setData(dashboardContent.TimeSpentEachData);
    });
  }

  // Only run once
  React.useEffect(() => {
    retrieveTimeSpentEach();
  }, []);

  return (
    <React.Fragment>
      <Title>Time Spent on Raids for past 7 days</Title>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <Bar dataKey="amount" fill="#3071E8"/>
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Time Spent (hr)
            </Label>
          </YAxis>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
