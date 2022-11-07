import * as React from "react";
import {useLocation } from 'react-router-dom';

import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import RecordForm from "./RecordForm";
import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

// TO DO!!! UPDATE REVIEW
async function sendUpdateReview(sendData) {
  var response = await GetAuthorizedResponse("/users/{user_id}/reviews", "POST", JSON.stringify(sendData));
  
  if (response.status === 200) {
    window.location.href = "/";
    return true;
  } else {
    console.log("Error adding new raid.");
    return false;
  }
}

function getCorrectRow(data, id)
{
  for (var i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return data[i];
    }
  }
  if (data.length > 0) {
    return data[0];
  }
  return {};
}

/* router: /add-record */
export default function EditRecordForm() {
  const id = new URLSearchParams(useLocation().search).get("record");

  const data = getCorrectRow(useLocation().state, id);

  // Log the data
  console.log(data);

  if (data === undefined) {
    window.location.href = "/";
  }

  //console.log(data.teamRaw);
  
  // TODO: Make this data correctly update the form
  const defaultInput = {
    GameTitle: data.GameTitle, 
    date: dayjs(data.dateRaw, "YYYY/MM/DD"),
    durations: data.durations,
    result: data.result,
    difficulty: data.difficulty,
    rating: data.rating,
    team: [],//TODO       data.teamRaw
    comments: data.comments,
  };

  function title() {
    return(
      <Box sx={{ my: 3 }}>
        <Typography variant="h4">Edit Raid Record</Typography>
      </Box>
    )
  }

  //testing
  //console.log("default:"+JSON.stringify(defaultInput));

  return (
    <RecordForm defaultInput={defaultInput} sendReview={sendUpdateReview} title={title} />
  );
}
