import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { SearchBar } from "./";
import { AddNewButton, BackButton } from "../../style/buttonStyle";

function createData(
  GamingRecord,
  Date,
  Duration,
  Difficulity,
  Teammates,
  Results,
  Comments
) {
  return {
    GamingRecord,
    Date,
    Duration,
    Difficulity,
    Teammates,
    Results,
    Comments,
  };
}

const rows = [
  createData(
    1,
    "2022/09/11",
    30,
    5,
    "12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345",
    "Win",
    "Really nice teammates, Really nice teammates, Really nice teammates, Really nice teammates, Really nice teammates"
  ),
  createData(
    2,
    "2022/09/11",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    3,
    "2022/09/11",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    1,
    "2022/09/11",
    30,
    5,
    "12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345",
    "Win",
    "Really nice teammates, Really nice teammates, Really nice teammates, Really nice teammates, Really nice teammates"
  ),
  createData(
    2,
    "2022/09/11",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    3,
    "2022/09/11",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    1,
    "2022/09/11",
    30,
    5,
    "12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345",
    "Win",
    "Really nice teammates, Really nice teammates, Really nice teammates, Really nice teammates, Really nice teammates"
  ),
  createData(
    2,
    "2022/09/11",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    3,
    "2022/09/11",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
];

export default function GameHistoryTable() {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={4}
      >
        <BackButton
          variant="text"
          startIcon={<ArrowBackIcon />}
          href="/history"
        >
          Back
        </BackButton>
        <SearchBar />
        <AddNewButton variant="contained" href="/add-record" disableRipple>
          + New Record
        </AddNewButton>
      </Stack>

      <TableContainer sx={{ height: 570 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Gaming Record</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Duration&nbsp;(minutes)</TableCell>
              <TableCell align="center">Difficulity</TableCell>
              <TableCell align="center">Teammates</TableCell>
              <TableCell align="center">Results</TableCell>
              <TableCell align="center">Comments</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.GamingRecord}
                </TableCell>
                <TableCell align="center">{row.Date}</TableCell>
                <TableCell align="center">{row.Duration}</TableCell>
                <TableCell align="center">{row.Difficulity}</TableCell>
                <TableCell align="center">{row.Teammates}</TableCell>
                <TableCell align="center">{row.Results}</TableCell>
                <TableCell align="center">{row.Comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
