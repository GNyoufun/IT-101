import * as React from "react";
import { Cell, PieChart, Pie, ResponsiveContainer, Sector } from "recharts";
import { GetDashboardContent } from "../apiRequest/DataStorage";

import Title from "./Title";


const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload
  } = props;

  return (
    <g>
      <text x={cx} y={cy-8} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}<br/>
      </text>
      <text x={cx} y={cy+12} dy={8} textAnchor="middle" fill={fill}>
        {payload.value} min
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius+2}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function MostWon() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Set the data
  const [data, setData] = React.useState([]);

  
  async function retrieveTimeSpentEach() {
    GetDashboardContent().then((dashboardContent) => {
      // All the data is available, set it
      //setData(dashboardContent.RecentRaids);
      setData(dashboardContent.TimeSpentData);
      console.log(dashboardContent.TimeSpentData);
      console.log("Set data");
    });
  }
  // Only run once
  React.useEffect(() => {
    retrieveTimeSpentEach();
  }, []);

  // const data = [
  //   { name: "LOL", value: 5 },
  //   { name: "FFXIV", value: 40 },
  //   { name: "Overwatch", value: 25 },
  //   { name: "Minecraft", value: 30 },
  // ];

  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = React.useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <React.Fragment>
      <Title>7 Day Game Summary</Title>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            innerRadius={"80%"}
            outerRadius={"100%"}
            activeIndex={activeIndex}
            onMouseEnter={onPieEnter}
            activeShape={renderActiveShape}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={false}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
