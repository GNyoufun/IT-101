import * as React from "react";
import {useLocation } from 'react-router-dom';

import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import RecordForm from "./RecordForm";
import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

// TO DO!!! UPDATE REVIEW
async function sendUpdateReview(sendData) {
  console.log(sendData);
  var sendUrl = "/users/{user_id}/reviews/" + sendData.id;
  var response = await GetAuthorizedResponse(sendUrl, "PUT", JSON.stringify(sendData));
  
  if (response.status === 200) {
    window.location.href = "/dashboard";
    return true;
  } else {
    console.log("Error adding new raid.");
    return false;
  }
}

function getCorrectRow(data, id)
{
  if (data === undefined || data === null || data.length === 0)
  {
    return {};
  }
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
  
  const defaultInput = {
    id: data.id,
    GameTitle: data.GameTitle, 
    date: dayjs(data.dateRaw, "YYYY/MM/DD"),
    durations: data.durations,
    result: data.result,
    difficulty: data.difficulty,
    rating: data.rating,
    team: data.teamRaw,
    comments: data.comments,
    images: data.images,
  };

  function title() {
    return(
      <Box sx={{ my: 3 }}>
        <Typography variant="h4">Edit Raid Record</Typography>
      </Box>
    )
  }

  return (
    <RecordForm defaultInput={defaultInput} sendReview={sendUpdateReview} title={title} />
  );
}
