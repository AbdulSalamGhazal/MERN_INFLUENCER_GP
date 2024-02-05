import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Filters() {
  const [field, setField] = useState("");
  const handleChangeField = (event) => {
    setField(event.target.value);
  };
  const [platform, setPlatform] = useState("");
  const handleChangePlatform = (event) => {
    setPlatform(event.target.value);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, pl: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <TextField id="outlined-basic" label="Search" fullWidth />
          </Grid>
          <Grid xs={4}>
            <FormControl fullWidth>
              <InputLabel id="field-label">Field</InputLabel>
              <Select
                labelId="field-label"
                id="field"
                label="field"
                value={field}
                onChange={handleChangeField}
              >
                <MenuItem value={"food"}>Food</MenuItem>
                <MenuItem value={"sport"}>Sport</MenuItem>
                <MenuItem value={"tv"}>TV</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl fullWidth>
              <InputLabel id="platform-label">Platform</InputLabel>
              <Select
                labelId="platform-label"
                id="platform"
                label="Platform"
                value={platform}
                onChange={handleChangePlatform}
              >
                <MenuItem value={"youtube"}>YouTube</MenuItem>
                <MenuItem value={"X(twitter)"}>X (twitter)</MenuItem>
                <MenuItem value={"snapchat"}>Snapchat</MenuItem>
                <MenuItem value={"instagram"}>Instagram</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Filters;
