import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Slider from "@mui/material/Slider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Filters({ setFilters }) {
  const updateFilters = (newFilter) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };
  const [search, setSearch] = useState("");
  const handleChangeSearch = (event) => {
    let searchTerm = event.target.value;
    setSearch(searchTerm);
    updateFilters({ name: searchTerm });
  };
  const [field, setField] = useState([]);
  const handleChangeField = (event) => {
    const {
      target: { value },
    } = event;
    let newValue = typeof value === "string" ? value.split(",") : value;
    setField(newValue);
    updateFilters({ field: newValue });
    console.log(newValue);
  };
  const [platform, setPlatform] = useState([]);

  const handleChangePlatform = (event) => {
    const {
      target: { value },
    } = event;
    setPlatform(typeof value === "string" ? value.split(",") : value);
  };

  const [cost, setCost] = useState([5000, 50000]);
  const handleChangeCost = (event, newValue) => {
    setCost(newValue);
  };

  const [followers, setFollowers] = useState("");

  return (
    <>
      <Box sx={{ flexGrow: 1, pl: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <TextField
              value={search}
              id="outlined-basic"
              label="Search"
              onChange={handleChangeSearch}
              fullWidth
            />
          </Grid>
          <Grid xs={4}>
            <FormControl fullWidth>
              <InputLabel id="field-label">Field</InputLabel>
              <Select
                labelId="field-label"
                id="field"
                label="field"
                multiple
                value={field}
                onChange={handleChangeField}
                input={<OutlinedInput label="Field" />}
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
                multiple
                value={platform}
                onChange={handleChangePlatform}
                input={<OutlinedInput label="Platform" />}
              >
                <MenuItem value={"youtube"}>YouTube</MenuItem>
                <MenuItem value={"X(twitter)"}>X (twitter)</MenuItem>
                <MenuItem value={"snapchat"}>Snapchat</MenuItem>
                <MenuItem value={"instagram"}>Instagram</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <InputLabel id="cost-label">Cost</InputLabel>

            <Slider
              getAriaLabel={() => "SAR"}
              value={cost}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v} SR`}
              onChange={handleChangeCost}
              min={1000}
              step={1000}
              max={100000}
            />
          </Grid>
          <Grid xs={4}>
            <FormControl fullWidth>
              <InputLabel id="followers-label">Followers</InputLabel>
              <Select
                labelId="followers-label"
                id="followers"
                label="followers"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                input={<OutlinedInput label="Followers" />}
              >
                <MenuItem value={50000}> &lt; 50K</MenuItem>
                <MenuItem value={100000}> &lt; 100K</MenuItem>
                <MenuItem value={250000}> &lt; 250K</MenuItem>
                <MenuItem value={500000}> &lt; 500K</MenuItem>
                <MenuItem value={1000000}> &lt; 1M</MenuItem>
                <MenuItem value={5000000}> &lt; 5M</MenuItem>
                <MenuItem value={10000000}> &lt; 10M</MenuItem>
                <MenuItem value={50000000}> &lt; 50M</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2} sx={{ pt: 0 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Date" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid xs={2}>
            <Stack spacing={2} direction="row" sx={{ my: 1 }}>
              <Button variant="text" size="small">
                Clear
              </Button>
              <Button fullWidth variant="contained" size="large">
                Search
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Filters;
