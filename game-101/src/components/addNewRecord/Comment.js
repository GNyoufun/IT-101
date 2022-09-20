import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Comment(props) {
  const handleChange = (e) => {
    props.setInputs({ ...props.inputs, comment: e.target.value });
  };

  return (
    <Box component='form' noValidate autoComplete='off'>
      <TextField
        fullWidth
        id='outlined-textarea'
        label='Comment'
        placeholder='Add your comment here'
        multiline
        value={props.inputs.comment}
        onChange={handleChange}
      />
    </Box>
  );
}
