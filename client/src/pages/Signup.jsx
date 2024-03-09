import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import PasswordInput from "../components/signup/PasswordInput";
import patterns from "../utils/patterns";

import InfluencerSignup from './InfluencerSignup';
import BusinessSignup from './BusinessSignup';

const Signup = () => {
  const [type, setType] = useState('Business');

  return (
    <Box
      component="main"
      align="center"
      sx={{ maxWidth: "450px", margin: "auto" }}
    >
      {/* {errorAlert && <Alert severity="error">{errorAlert}</Alert>} */}
      {/* {
        <Alert
          severity="error"
          sx={{ visibility: errorAlert == null ? "hidden" : "vislible" }}
        >
          {errorAlert}
        </Alert>
      } */}
      <Typography component="h1" variant="h3" align="center">
        انشاء حساب
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={type}
          onChange={(e, newValue) => setType(newValue)}
          variant="fullWidth"
        >
          <Tab label="صاحب عمل" value={"Business"} />
          <Tab label="مشهور" value={"Influencer"} />
        </Tabs>
      </Box>

      <Box
        sx={{ mt: 1 }}
      >
        {type == 'Influencer'? <InfluencerSignup /> : <BusinessSignup/>}
      </Box>

      {/* <TabPanel value="business"><LoginForm /></TabPanel>
      <TabPanel value="influencer"><LoginForm /></TabPanel> */}
    </Box>
  );
};

export default Signup;
