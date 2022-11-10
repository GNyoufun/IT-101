import { useEffect, useState } from "react";

import { Grid, TableContainer } from "@mui/material";

import { GameCard } from "./";
import Loading, { GetAllGames } from "../apiRequest/DataStorage";

export default function GameList() {
  const [games, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);

  async function retrieveGames() {
    GetAllGames().then((gameData) => {
      console.log(gameData);
      // Use the gameData to set the state of the gameList
      setAllGames(gameData);
      setLoading(false);
    });
  }

  // Retrieve all games when the page is loaded
  useEffect(() => {
    retrieveGames();
  }, []);

  return (
    <TableContainer sx={{ height: 580 }}>
      {/* Go to "GameCard.js" in "components/gameHistory"
       *  A card contains Game's name and picture
       */}
      {loading ? (
        Loading()
      ) : (
        <Grid container spacing={3}>
          {games.map((game, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <GameCard game={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </TableContainer>
  );
}
