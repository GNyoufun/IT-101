import * as React from "react";

import { Link, Typography } from "@mui/material";

import Title from "./Title";
import { GetDashboardContent } from "../apiRequest/DataStorage";

function preventDefault(event) {
  event.preventDefault();
}


export default function MostWon() {
  const [game, setMostWonGame] = React.useState({"mostWonGame": "Loading...", "mostWon": "Loading..."});

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
    setMostWonGame({mostWonGame: "Loading...", mostWon: "Loading..."});
    retrieveMostWon();
  }, []);

  return (
    <React.Fragment>
      <Title>Most Successful Game</Title>
      
      {typeof game.mostWon === "string" ? // The most won will be a string if no games have been played
      (
      <Typography component="p" variant="h4"></Typography>
      ) : (
        <Typography component="p" variant="h4">
        {game.mostWonGame}
      </Typography>
      )}

      {typeof game.mostWon === "string" ?
      (
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Record some gameplay to see your most successful game!
      </Typography>
      ) : (
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {"Win rate: " + game.mostWon.toFixed(decimalPlaces) + "%"}
      </Typography>
      )}

      <div>
        {typeof game.mostWon === "string" ?
        (
          null
        ) : (
          <Link color="primary" href="#" onClick={preventDefault}>
            View Detail
          </Link>
        )}
      </div>
    </React.Fragment>
  );
}
