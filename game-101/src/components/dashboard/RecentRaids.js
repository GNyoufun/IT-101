import * as React from "react";

import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import Title from "./Title";

// Generate Order Data
function createData(id, date, name, game, outcome) {
  return { id, date, name, game, outcome };
}

const rows = [
  createData(0, "17 Mar, 2022", "C", "LOL", "Draw"),
  createData(1, "16 Mar, 2022", "B", "LOL", "Win"),
  createData(2, "16 Mar, 2022", "C", "Overwatch", "Win"),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Raids</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Game</TableCell>
            <TableCell align="right">Outcome</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.game}</TableCell>
              <TableCell align="right">{row.outcome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}
