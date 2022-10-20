import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Box, Card, CardActionArea, Typography, Stack } from "@mui/material";
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
  const name = game.name;
  console.log(name);
  const cover = null; //game.Image;
  //const { name, cover } = game;

  return (
    <Card>
      <CardActionArea
        component={Link}
        to={{
          pathname: "/table",
          search: "?utm="+name
        }}
      >
        {/* Game's picture */}
        <Box sx={{ pt: "100%", position: "relative", height: "320px" }}>
          {/*<GameImgStyle alt={name} src={cover} />*/}
        </Box>

        {/* Game's name */}
        <Stack spacing={2} sx={{ p: 1.5 }}>
          <Typography variant='subtitle2' noWrap>
            {name}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
