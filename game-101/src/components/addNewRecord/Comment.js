import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Comment() {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
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
          minRows={2}
          value={value}
          onChange={handleChange}
        />
    </Box>
  );
}
