import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import InfluencerSignup from "./InfluencerSignup";
import BusinessSignup from "./BusinessSignup";

const Signup = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  // const [type, setType] = useState('Business');

  return (
    <Box
      component="main"
      align="center"
      sx={{ maxWidth: "450px", margin: "auto" }}
    >
      <Typography component="h1" variant="h3" align="center">
        انشاء حساب
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={type}
          onChange={(e, newValue) => navigate(`/signup/${newValue}`)}
          variant="fullWidth"
        >
          <Tab label="تاجر" value={"business"} />
          <Tab label="مؤثر" value={"influencer"} />
        </Tabs>
      </Box>

      <Box sx={{ mt: 1 }}>
        {type == "influencer" ? <InfluencerSignup /> : <BusinessSignup />}
      </Box>
    </Box>
  );
};

export default Signup;
