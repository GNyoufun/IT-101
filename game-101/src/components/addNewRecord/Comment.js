import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Comment() {
  const [comment, setComment] = React.useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };
  

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
        <TextField fullWidth
          id="outlined-textarea"
          label="Comment"
          placeholder="Add your comment here"
          multiline
          value={comment}
          onChange={handleChange}
        />
    </Box>
  );
}
