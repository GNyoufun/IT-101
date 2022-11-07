import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid } from "@mui/x-data-grid";
import { Menu, MenuItem, Container, Stack } from "@mui/material";

import { SearchBar } from "./";
import { AddNewButton, BackButton } from "../../style/buttonStyle";

import Loading from "../apiRequest/DataStorage";
import { GetReviewsForGame } from "../apiRequest/DataStorage";

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "durations",
    headerName: "Duration",
    width: 80,
  },
  {
    field: "difficulty",
    headerName: "Difficulty",
    width: 80,
  },
  {
    field: "result",
    headerName: "Result",
    width: 80,
  },
  {
    field: "team",
    headerName: "Teammates",
    width: 200,
  },
  {
    field: "comments",
    headerName: "Comments",
    width: 400,
  },
];

export default function GameHistoryTable() {
  const [contextMenu, setContextMenu] = useState(null);
  const [data, setData] = useState(null);
  const [raids, setRaidData] = useState([]);

  // get game title from url
  const GameTitle = useLocation().search;

  const handleEvent = (params, event, details) => {
    setData(params.row);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    console.log(raids);
    setContextMenu(null);
  };

  
  async function retrieveRaids() {
    GetReviewsForGame(GameTitle.replace("?","")).then((gameRaids) => {
      // Use the gameData to set the state of the gameList
      setRaidData(gameRaids);
      setLoading(false);
    });
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // retrive data
    retrieveRaids();
    
    // load for 2 sec
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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

      {loading ? (
      Loading()) : (
      <div style={{ height: 580, width: "100%" }}>
        <DataGrid
          rows={raids}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[10]}
          onRowClick={handleEvent}
        />
      </div>
      )}

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          component={Link}
          onClick={handleClose}
          to="/edit-record"
          state={raids}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Container>
  );
}

/* dummy data */

// function createData(
//   raid_id,
//   date,
//   GameTitle,
//   durations,
//   difficulty,
//   rating,
//   team,
//   result,
//   comments
// ) {
//   const data = {
//     id: raid_id,
//     date: date,
//     GameTitle: GameTitle,
//     durations: durations,
//     difficulty: difficulty,
//     rating: rating,
//     result: result,
//     team: team,
//     comments: comments,
//   };
//   return data;
// }

// const rows = [
//   createData(
//     1,
//     "2022/09/11",
//     "League of Legends",
//     30,
//     5,
//     8,
//     "12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345",
//     "Win",
//     "Really nice teammates, Really nice teammates, "
//   ),
//   createData(
//     2,
//     "2022/09/11",
//     "League of Legends",
//     30,
//     5,
//     8,
//     "12138, 12345",
//     "Win",
//     "Really nice teammates"
//   ),
//   createData(
//     3,
//     "2022/09/11",
//     "Overwatch",
//     30,
//     5,
//     8,
//     "12138, 12345",
//     "Win",
//     "Really nice teammates"
//   ),
//   createData(
//     4,
//     "2022/09/11",
//     "League of Legends",
//     30,
//     5,
//     8,
//     "12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345",
//     "Win",
//     "Really nice teammates, Really nice teammates,"
//   ),
//   createData(
//     5,
//     "2022/09/11",
//     "Final Fantasy XIV",
//     30,
//     9,
//     8,
//     "12138, 12345",
//     "Win",
//     "Really nice teammates"
//   ),
//   createData(
//     6,
//     "2022/09/11",
//     "League of Legends",
//     30,
//     6,
//     7,
//     "12138, 12345",
//     "Win",
//     "Really nice teammates"
//   ),
//   createData(
//     7,
//     "2022/09/11",
//     "League of Legends",
//     30,
//     5,
//     9,
//     "12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345",
//     "Win",
//     "Really nice teammates, Really nice teammates"
//   ),
//   createData(
//     8,
//     "2022/09/11",
//     "League of Legends",
//     30,
//     8,
//     9,
//     "12138, 12345",
//     "Win",
//     "Really nice teammates"
//   ),
//   createData(
//     9,
//     "2022/09/11",
//     "League of Legends",
//     30,
//     5,
//     8,
//     "12138, 12345",
//     "Win",
//     "Really nice teammates"
//   ),
// ];
