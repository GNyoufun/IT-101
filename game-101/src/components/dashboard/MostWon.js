import * as React from "react";

import { Link, Typography } from "@mui/material";

import Title from "./Title";
import { GetDashboardContent } from "../apiRequest/DataStorage";

function preventDefault(event) {
  event.preventDefault();
}


export default function MostWon() {
  const [game, setMostWonGame] = React.useState({"mostWonGame": "Loading...", "mostWon": 0});

  const decimalPlaces = 1;
  async function retrieveMostWon() {
    GetDashboardContent().then((dashboardContent) => {
      // All the data is available, set it
      console.log(dashboardContent.MostWonData);
      setMostWonGame(dashboardContent.MostWonData);
    });
  }

  // Only run once
  React.useEffect(() => {
    setMostWonGame({mostWonGame: "Loading...", mostWon: 0});
    retrieveMostWon();
  }, []);

  return (
    <React.Fragment>
      <Title>Most Successful Game</Title>
      <Typography component="p" variant="h4">
        {game.mostWonGame}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Win rate: {game.mostWon.toFixed(decimalPlaces)}%
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Detail
        </Link>
      </div>
    </React.Fragment>
  );
}
