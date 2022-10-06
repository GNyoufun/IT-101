import PropTypes from "prop-types";

import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const GameImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

GameCard.propTypes = {
  game: PropTypes.object,
};

export default function GameCard({ game }) {
  const { name, cover } = game;

  return (
    <Card>
      {/* Game's picture */}
      <Box sx={{ pt: "100%", position: "relative" }}>
        <GameImgStyle alt={name} src={cover} />
      </Box>

      {/* Game's name with href */}
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}
