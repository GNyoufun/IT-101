import { Link } from "react-router-dom";

import { Box, Card, CardActionArea, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import defaultImage from "../../style/defaultGame.png";

export default function GameCard(props) {
  const name = props.game.name;
  const cover =
    props.game.cover !== null && props.game.cover !== "No Cover"
      ? props.game.cover
      : defaultImage;

  const GameImgStyle = styled("img")({
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "scale-down",
    position: "absolute",
  });

  return (
    <Card  sx={{
      maxWidth: "220px",
      my: 1
    }}>
      <CardActionArea
        component={Link}
        to={{
          pathname: "/table",
          search: "game=" + name,
        }}
      >
        {/* Game's picture */}
        <Box
          sx={{
            pt: "100%",
            width: "220px",
            height: "330px",
            position: "relative",
          }}
        >
          <GameImgStyle alt={name} sx= {{objectFit: "contain"}} src={cover} />
        </Box>

        {/* Game's name */}
        <Stack spacing={2} sx={{ p: 1}}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
