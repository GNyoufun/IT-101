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
import { GetDashboardContent } from "../apiRequest/DataStorage";

export default function Orders() {
  // Update the state to have new data
  const [rows, setData] = React.useState([]);

  async function retrieveRaids() {
    GetDashboardContent().then((dashboardContent) => {
      // All the data is available, set it
      setData(dashboardContent.RecentRaidsData);
    });
  }

  // Only run once
  React.useEffect(() => {
    retrieveRaids();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Raids</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Game</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell align="right">Outcome</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.game}</TableCell>
              <TableCell>{row.comments}</TableCell>
              <TableCell align="right">{row.outcome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/table" sx={{ mt: 3 }} to="">
        See more
      </Link>
    </React.Fragment>
  );
}
