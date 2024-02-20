// import { useState } from "react";
// import { Tabs, Tab } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonSearchIcon from "@mui/icons-material/PersonSearch";
// import ChatIcon from "@mui/icons-material/Chat";
// import CampaignIcon from "@mui/icons-material/Campaign";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LogoutDialog from "./LogoutDialog";
import useAuth from "../../context/AuthContext";
import ProfileDialog from "./ProfileDialog";

// const LinkTab = (props) => <Tab component={Link} {...props} />;

export default function Navbar() {
  // const [value, setValue] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
    handleClose();
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleLogoutDialogClose();
    navigate("/login");
  };
  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left-aligned button for the logo/site title */}
        <Button
          color="inherit"
          component={RouterLink}
          to="/"
          sx={{ fontWeight: "bold" }}
        >
          My Website
        </Button>

        {user && (
          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            <Button color="inherit" component={RouterLink} to="/influencers">
              Influencer
            </Button>
            <Button color="inherit" component={RouterLink} to="/chat">
              Chat
            </Button>
            <Button color="inherit" component={RouterLink} to="/campaign">
              Campaign
            </Button>
          </Box>
        )}

        {user ? (
          <>
            <Avatar
              src={user?.image}
              alt={user?.name}
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleProfileDialogOpen}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogoutDialogOpen}>Logout</MenuItem>
            </Menu>
            <LogoutDialog
              open={logoutDialogOpen}
              handleClose={handleLogoutDialogClose}
              handleLogout={handleLogout}
            />
            <ProfileDialog
              user={user}
              open={profileDialogOpen}
              setOpen={setProfileDialogOpen}
            />
          </>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button color="inherit" component={RouterLink} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Log In
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
