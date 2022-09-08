import * as React from "react";

import { Link, Typography } from "@mui/material/Link";

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://gnyoufun.github.io/IT-101/">
        IT 101
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
