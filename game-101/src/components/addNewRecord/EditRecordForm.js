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

/* router: /add-record */
export default function EditRecordForm() {
  const data = useLocation().state;

  const defaultInput = {
    // TODO: change everything, fetch from prop.
    GameTitle: "", 
    date: dayjs(),
    durations: 30,
    result: "Draw",
    difficulty: 5,
    rating: 6,
    team: [],
    comments: "",
  };

  function title() {
    return(
      <Box sx={{ my: 3 }}>
        <Typography variant="h4">Edit Raid Record</Typography>
      </Box>
    )
  }

  //testing
  console.log("test:"+JSON.stringify(data));

  return (
    <RecordForm defaultInput={defaultInput} sendReview={sendUpdateReview} title={title} />
  );
}
