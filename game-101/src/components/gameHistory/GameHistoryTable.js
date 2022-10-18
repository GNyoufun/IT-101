import * as React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Menu, MenuItem, Container, Stack } from "@mui/material";

import { SearchBar } from "./";
import { AddNewButton, BackButton } from "../../style/buttonStyle";

function createData(
  GamingRecord,
  Date,
  Game,
  Duration,
  Difficulty,
  Teammates,
  Results,
  Comments
) {
  const data = {
    "id": GamingRecord,
    "Date": Date,
    "Game": Game,
    "Duration": Duration,
    "Difficulty": Difficulty,
    "Results": Results,
    "Teammates": Teammates,
    "Comments": Comments,
  };
  return data;
}

const rows: GridRowsProp = [
  createData(
    1,
    "2022/09/11",
    "League of Legends",
    30,
    5,
    "12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345",
    "Win",
    "Really nice teammates, Really nice teammates, "
  ),
  createData(
    2,
    "2022/09/11",
    "League of Legends",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    3,
    "2022/09/11",
    "Overwatch",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    4,
    "2022/09/11",
    "League of Legends",
    30,
    5,
    "12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345",
    "Win",
    "Really nice teammates, Really nice teammates,"
  ),
  createData(
    5,
    "2022/09/11",
    "Final Fantasy XIV",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    6,
    "2022/09/11",
    "League of Legends",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    7,
    "2022/09/11",
    "League of Legends",
    30,
    5,
    "12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345, 12138, 12345",
    "Win",
    "Really nice teammates, Really nice teammates"
  ),
  createData(
    8,
    "2022/09/11",
    "League of Legends",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
  createData(
    9,
    "2022/09/11",
    "League of Legends",
    30,
    5,
    "12138, 12345",
    "Win",
    "Really nice teammates"
  ),
];

const columns: GridColDef[] = [
  {
    field: "Date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "Game",
    headerName: "Game",
    flex: 1,
  },
  {
    field: "Duration",
    headerName: "Duration",
    width: 80,
  },
  {
    field: "Difficulty",
    headerName: "Difficulty",
    width: 80,
  },
  {
    field: "Results",
    headerName: "Results",
    width: 80,
  },
  {
    field: "Teammates",
    headerName: "Teammates",
    width: 200,
  },
  {
    field: "Comments",
    headerName: "Comment",
    width: 400,
  },
];

export default function GameHistoryTable() {
  const [contextMenu, setContextMenu] = React.useState(null);
  const [data, setData] = React.useState(null);

  const handleEvent: GridEventListener<"rowClick"> = (
    params, // GridRowParams
    event,
    details // GridCallbackDetails
  ) => {
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
    setContextMenu(null);
  };

  return (
    <Container>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        px={4}
        py={4}
      >
        <BackButton
          variant='text'
          startIcon={<ArrowBackIcon />}
          href='/history'
        >
          Back
        </BackButton>
        <SearchBar />
        <AddNewButton variant='contained' href='/add-record' disableRipple>
          + New Record
        </AddNewButton>
      </Stack>

      <div style={{ height: 580, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[10]}
          onRowClick={handleEvent}
        />
      </div>

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>
          <Link
            to={{
              pathname: "/edit-record",
              state: { message: 'testing' } 
            }}
          >
            Edit
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Container>
  );
}
