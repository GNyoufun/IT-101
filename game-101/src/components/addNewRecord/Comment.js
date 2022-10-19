import * as React from "react";

import { TextField } from "@mui/material";

export default function Comment(props) {
  const handleChange = (e) => {
    props.setInputs({ ...props.inputs, comments: e.target.value });
  };

  return (
    <TextField
      fullWidth
      id='outlined-textarea'
      label='Comment'
      placeholder='Add your comment here'
      multiline
      value={props.inputs.comments}
      onChange={handleChange}
    />
  );
}
