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
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import BackspaceIcon from "@mui/icons-material/Backspace";

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
    let newField = typeof value === "string" ? value.split(",") : value;
    setField(newField);
    updateFilters({ field: newField });
    console.log(newField);
  };
  const [platform, setPlatform] = useState([]);
  const handleChangePlatform = (event) => {
    const {
      target: { value },
    } = event;
    let newPlatform = typeof value === "string" ? value.split(",") : value;
    setPlatform(newPlatform);
    updateFilters({ platforms: newPlatform });
  };
  const [audience, setAudience] = useState([]);
  const handleChangeAudience = (event) => {
    const {
      target: { value },
    } = event;
    let newAudience = typeof value === "string" ? value.split(",") : value;
    setAudience(newAudience);
    updateFilters({ audience: newAudience });
  };

  const [cost, setCost] = useState([5000, 50000]);
  const handleChangeCost = (event, newCost) => {
    setCost(newCost);
    updateFilters({ avg_cost_min: newCost[0], avg_cost_max: newCost[1] });
  };

  const [followers, setFollowers] = useState("");
  const handleChangeFollowers = (event) => {
    let newFollowers = event.target.value;
    setFollowers(newFollowers);
    updateFilters({ total_followers: newFollowers });
  };
  const [location, setLocation] = useState([]);
  const handleChangeLocation = (event) => {
    const {
      target: { value },
    } = event;
    let newLocation = typeof value === "string" ? value.split(",") : value;
    setLocation(newLocation);
    updateFilters({ location: newLocation });
  };
  const [checked, setChecked] = useState(false);
  const handleChangeVerified = (event) => {
    let isVerified = event.target.checked;
    setChecked(isVerified);
    updateFilters({ verified: isVerified });
  };

  const handleClearFilters = () => {
    setSearch("");
    setField([]);
    setPlatform([]);
    setAudience([]);
    setCost([5000, 50000]);
    setFollowers("");
    setLocation([]);
    setChecked(false);

    updateFilters({
      name: "",
      field: [],
      platforms: [],
      audience: [],
      avg_cost_min: 5000,
      avg_cost_max: 50000,
      total_followers: 50000000,
      location: [],
      verified: undefined,
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, pl: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <TextField
              value={search}
              id="outlined-basic"
              label="Search"
              onChange={handleChangeSearch}
              fullWidth
            />
          </Grid>
          <Grid xs={3}>
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
                <MenuItem value={"Gaming"}>Gaming</MenuItem>
                <MenuItem value={"Beauty and Makeup"}>
                  Beauty and Makeup
                </MenuItem>
                <MenuItem value={"Fashion"}>Fashion</MenuItem>
                <MenuItem value={"Fitness and Health"}>
                  Fitness and Health
                </MenuItem>
                <MenuItem value={"Technology and Gadgets"}>
                  Technology and Gadgets
                </MenuItem>
                <MenuItem value={"Food and Cooking"}>Food and Cooking</MenuItem>
                <MenuItem value={"Travel"}>Travel</MenuItem>
                <MenuItem value={"DIY and Crafts"}>DIY and Crafts</MenuItem>
                <MenuItem value={"Parenting and Family"}>
                  Parenting and Family
                </MenuItem>
                <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
                <MenuItem value={"Education and Learning"}>
                  Education and Learning
                </MenuItem>
                <MenuItem value={"Business and Entrepreneurship"}>
                  Business and Entrepreneurship
                </MenuItem>
                <MenuItem value={"Photography and Videography"}>
                  Photography and Videography
                </MenuItem>
                <MenuItem value={"Music and Dance"}>Music and Dance</MenuItem>
                <MenuItem value={"Sports and Athletics"}>
                  Sports and Athletics
                </MenuItem>
                <MenuItem value={"Wellness and Mental Health"}>
                  Wellness and Mental Health
                </MenuItem>
                <MenuItem value={"Home Decor and Interior Design"}>
                  Home Decor and Interior Design
                </MenuItem>
                <MenuItem value={"Art and Design"}>Art and Design</MenuItem>
                <MenuItem value={"Science and Innovation"}>
                  Science and Innovation
                </MenuItem>
                <MenuItem value={"Environmental Sustainability"}>
                  Environmental Sustainability
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
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
                <MenuItem value={"YouTube"}>YouTube</MenuItem>
                <MenuItem value={"X (twitter)"}>X (twitter)</MenuItem>
                <MenuItem value={"Snapchat"}>Snapchat</MenuItem>
                <MenuItem value={"Instagram"}>Instagram</MenuItem>
                <MenuItem value={"Facebook"}>Facebook</MenuItem>
                <MenuItem value={"TikTok"}>TikTok</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="audience-label">Audience</InputLabel>
              <Select
                labelId="audience-label"
                id="audience"
                label="audience"
                multiple
                value={audience}
                onChange={handleChangeAudience}
                input={<OutlinedInput label="audience" />}
              >
                <MenuItem value={"Fashion"}>Fashion</MenuItem>
                <MenuItem value={"Technology"}>Technology</MenuItem>
                <MenuItem value={"Fitness"}>Fitness</MenuItem>
                <MenuItem value={"Gaming"}>Gaming</MenuItem>
                <MenuItem value={"Travel"}>Travel</MenuItem>
                <MenuItem value={"Food"}>Food</MenuItem>
                <MenuItem value={"DIY Projects"}>DIY Projects</MenuItem>
                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"Education"}>Education</MenuItem>
                <MenuItem value={"Sustainability"}>Sustainability</MenuItem>
                <MenuItem value={"Health and Wellness"}>
                  Health and Wellness
                </MenuItem>
                <MenuItem value={"Beauty"}>Beauty</MenuItem>
                <MenuItem value={"Sports"}>Sports</MenuItem>
                <MenuItem value={"Music"}>Music</MenuItem>
                <MenuItem value={"Photography"}>Photography</MenuItem>
                <MenuItem value={"Art and Design"}>Art and Design</MenuItem>
                <MenuItem value={"Personal Finance"}>Personal Finance</MenuItem>
                <MenuItem value={"Parenting"}>Parenting</MenuItem>
                <MenuItem value={"Outdoor Activities"}>
                  Outdoor Activities
                </MenuItem>
                <MenuItem value={"Literature and Reading"}>
                  Literature and Reading
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
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
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="followers-label">Followers</InputLabel>
              <Select
                labelId="followers-label"
                id="followers"
                label="followers"
                value={followers}
                onChange={handleChangeFollowers}
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
          </Grid>{" "}
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                labelId="location-label"
                id="location"
                label="location"
                multiple
                value={location}
                onChange={handleChangeLocation}
                input={<OutlinedInput label="location" />}
              >
                <MenuItem value={"Central"}>Central (e.g., Riyadh)</MenuItem>
                <MenuItem value={"Western"}>
                  Western (e.g., Jeddah, Mecca, Medina)
                </MenuItem>
                <MenuItem value={"Eastern"}>
                  Eastern (e.g., Dammam, Khobar, Al-Ahsa)
                </MenuItem>
                <MenuItem value={"Southern"}>
                  Southern (e.g., Abha, Najran, Jizan)
                </MenuItem>
                <MenuItem value={"Northern"}>
                  Northern (e.g., Tabuk, Al-Jouf)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2}>
            <InputLabel id="check">Verfied?</InputLabel>

            <Switch
              sx={{ ml: 4 }}
              checked={checked}
              onChange={handleChangeVerified}
            />
          </Grid>
          <Grid xs={1}>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              endIcon={<BackspaceIcon />}
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Filters;
