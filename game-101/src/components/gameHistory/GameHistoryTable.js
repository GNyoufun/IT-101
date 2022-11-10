import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid } from "@mui/x-data-grid";
import { Menu, MenuItem, Container, Stack, Typography } from "@mui/material";

import { AddNewButton, BackButton } from "../../style/buttonStyle";

import Loading from "../apiRequest/DataStorage";
import { GetReviewsForGame } from "../apiRequest/DataStorage";

const { GetAuthorizedResponse } = require("../apiRequest/AuthorizedRequest");

const thumbnail = { height: "50px" };

const columns = [
  {
    field: "GameTitle",
    headerName: "Game",
    width: 150,
  },
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
    field: "rating",
    headerName: "Rating",
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
    field: "images",
    headerName: "Images",
    width: 200,
    renderCell: (params) => <img style={thumbnail} src={params.value} />,
  },
  {
    field: "comments",
    headerName: "Comments",
    width: 200,
  },
];

async function deleteRaid(id) {
  if (id === undefined || id === null || id === "") {
    return;
  }

  var url = "/users/{user_id}/reviews/" + id;

  // Wait for the deletion to occur
  var deleteProm = GetAuthorizedResponse(url, "DELETE");
  await deleteProm;

  // Refresh the page
  window.location.reload();
}

export default function GameHistoryTable() {
  const [contextMenu, setContextMenu] = useState(null);
  const [data, setData] = useState(null);
  const [raids, setRaidData] = useState([]);
  const [raidId, setRaidId] = useState(null);

  // get game title from url
  var gt = new URLSearchParams(useLocation().search).get("game");
  const GameTitle = gt == null ? "" : gt;

  const handleEvent = (params, event, details) => {
    setData(params.row);

    if (contextMenu) {
      setRaidId(null);
    } else {
      setRaidId(params.row.id);
    }

    // Toggle the context menu
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = (type) => {
    setContextMenu(null);

    if (type === "delete") {
      deleteRaid(raidId);
    }
  };

  async function retrieveRaids() {
    GetReviewsForGame(GameTitle).then((gameRaids) => {
      // Use the gameData to set the state of the gameList
      setRaidData(gameRaids);
      console.log(gameRaids);
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
          href={GameTitle !== "" ? "/history" : "/dashboard"}
        >
          Back
        </BackButton>
        <AddNewButton variant="contained" href="/add-record" disableRipple>
          + New Record
        </AddNewButton>
      </Stack>

      {loading ? (
        Loading()
      ) : raids.length > 0 ? (
        <div style={{ height: 580, width: "100%" }}>
          <DataGrid
            rows={raids}
            columns={columns}
            pageSize={12}
            rowsPerPageOptions={[12]}
            onRowClick={handleEvent}
          />
        </div>
      ) : (
        <Typography>No records found</Typography>
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
          onClick={() => handleClose("edit")}
          to={"/edit-record?record=" + raidId}
          state={raids}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleClose("delete")}>Delete</MenuItem>
      </Menu>
    </Container>
  );
}
