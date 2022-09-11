import PropTypes from "prop-types";

import { Grid } from "@mui/material";

import { GameCard } from "./";

GameList.propTypes = {
  games: PropTypes.array.isRequired,
};

export default function GameList({ games }) {
  return (
    <Grid container spacing={3}>
      {games.map((game) => (
        <Grid key={game.id} item xs={12} sm={6} md={3}>
          <GameCard game={game} />
        </Grid>
      ))}
    </Grid>
  );
}
