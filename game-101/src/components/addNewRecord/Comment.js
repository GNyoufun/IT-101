import * as React from "react";

import { Box, TextField } from "@mui/material";

export default function Comment(props) {
  const handleChange = (e) => {
    props.setInputs({ ...props.inputs, comment: e.target.value });
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        fullWidth
        id="outlined-textarea"
        label="Comment"
        placeholder="Add your comment here"
        multiline
        value={props.inputs.comment}
        onChange={handleChange}
      />
    </Box>
  );
}
