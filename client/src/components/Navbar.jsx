import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import ChatIcon from "@mui/icons-material/Chat";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CampaignIcon from "@mui/icons-material/Campaign";

import { Link } from "react-router-dom";

// Update LinkTab to correctly forward props
const LinkTab = (props) => <Tab component={Link} {...props} />;

export default function Navbar() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} centered>
      <LinkTab
        icon={<PersonSearchIcon />}
        label="Influencer"
        to="/influencers"
        value={0} // Assigning value for each tab
      />
      <LinkTab icon={<ChatIcon />} label="Chat" to="/chat" value={1} />
      <LinkTab
        icon={<CampaignIcon />}
        label="Campaign"
        to="/campaign"
        value={2}
      />
    </Tabs>
  );
}
