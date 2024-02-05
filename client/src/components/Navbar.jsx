import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ChatIcon from "@mui/icons-material/Chat";
import CampaignIcon from "@mui/icons-material/Campaign";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";

const LinkTab = (props) => <Tab component={Link} {...props} />;

export default function Navbar() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      centered
      sx={{
        "& .MuiTabs-flexContainer": {
          justifyContent: "space-between",
        },
      }}
    >
      {/* Home tab on the far left */}
      <LinkTab
        icon={<HomeIcon />}
        label="Home"
        to="/home"
        value={0}
        sx={{ flex: 1, maxWidth: "none" }}
      />

      {/* Middle tabs */}
      <LinkTab
        icon={<PersonSearchIcon />}
        label="Influencer"
        to="/influencers"
        value={1}
        sx={{ flex: 1, maxWidth: "none" }}
      />
      <LinkTab
        icon={<ChatIcon />}
        label="Chat"
        to="/chat"
        value={2}
        sx={{ flex: 1, maxWidth: "none" }}
      />
      <LinkTab
        icon={<CampaignIcon />}
        label="Campaign"
        to="/campaign"
        value={3}
        sx={{ flex: 1, maxWidth: "none" }}
      />

      {/* Account tab on the far right */}
      <LinkTab
        icon={<AccountBoxIcon />}
        label="Account"
        to="/account"
        value={4}
        sx={{ flex: 1, maxWidth: "none" }}
      />
    </Tabs>
  );
}
