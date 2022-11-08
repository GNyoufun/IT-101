import { Link } from "react-router-dom";
import { Box, Card, CardActionArea, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import defaultImage from "../../style/defaultGame.png";

export default function GameCard(props) {
  const name = props.game.name;
  const cover = defaultImage; // need to change

  const GameImgStyle = styled("img")({
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
  });

  return (
    <Card>
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
            position: "relative",
            height: "300px",
          }}
        >
          <GameImgStyle alt={name} src={cover} />
        </Box>

        {/* Game's name */}
        <Stack spacing={2} sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
