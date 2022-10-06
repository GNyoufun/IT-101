import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import pageNotFound from "../style/404.svg";

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(8, 0),
}));

export default function Page404() {
  return (
    <Container>
      <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>

        <Typography>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src={pageNotFound}
          sx={{ height: 240, mx: "auto", my: { xs: 5, sm: 10 } }}
        />

        <Button size="large" variant="contained">
          Go to Home
        </Button>
      </ContentStyle>
    </Container>
  );
}
