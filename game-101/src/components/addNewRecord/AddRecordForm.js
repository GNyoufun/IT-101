import * as React from "react";

import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import RecordForm from "./RecordForm";
import { GetAuthorizedResponse } from "../apiRequest/AuthorizedRequest";

// convert data into base64 encoded
async function processImages(files) {
  let convertedFiles = {};

  for (let i = 0; i < files.length; i++) {
    let imageName = files[i].name;
    let dataType = files[i].type;
    const convertedFile = await convertToBase64(files[i]);
    convertedFiles[imageName] = [dataType,convertedFile]
  }

  return convertedFiles;
}

async function convertToBase64 (file) {
  return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          resolve(reader.result);
      }
  })
}

// Sends a new record to the server
async function sendNewReview(sendData, imageFiles) {
  let processed = await processImages(imageFiles);
  sendData["imageFiles"] = processed;
  console.log(processed);
  console.log(sendData);

  var response = await GetAuthorizedResponse("/users/{user_id}/reviews", "POST", JSON.stringify(sendData));
  
  if (response.status === 200) {
    // Review successfully added, redirect to the home page
    // TODO: Use a React Router redirect
    // TODO: Decide on redirect location? Reviews or Home?
    window.location.href = "/dashboard";
    return true;
  } else {
    console.log("Error adding new raid.");
    return false;
  }
}

/* router: /add-record */
export default function AddRecordForm() {
  // TODO: Check that the game date isn't in the future
  const defaultInput = {
    // TODO: add UserId
    GameTitle: "", // TODO: Get first game in list
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
        <Typography variant="h4">Add New Raid Record</Typography>
      </Box>
    )
  }

  return (
    <RecordForm defaultInput={defaultInput} sendReview={sendNewReview} title={title} />
  );
}
