import PropTypes from "prop-types";

import { Grid, TableContainer } from "@mui/material";

import { GameCard } from "./";

GameList.propTypes = {
  games: PropTypes.array.isRequired,
};

export default function GameList({ games }) {
  return (
    <TableContainer sx={{ height: 600 }}>
      {/* Go to "GameCard.js" in "components/gameHistory"
       *  A card contains Game's name and picture
       */}
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid key={game.id} item xs={12} sm={6} md={3}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </TableContainer>
  );
}
