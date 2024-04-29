import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LogoutDialog from "./LogoutDialog";
import useAuth from "../../context/AuthContext";
import ProfileDialog from "./ProfileDialog";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatIcon from "@mui/icons-material/Chat";
import CampaignIcon from "@mui/icons-material/Campaign";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
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

  const handleMyAcountOpen = () => {
    navigate("/account");
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Button
          color="inherit"
          component={RouterLink}
          to="/"
          sx={{ fontWeight: "bold", fontSize: "2rem" }}
        >
          مـــؤثــــر
        </Button>

        {user && (
          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            {user.type === "Business" && (
              <Button
                color="inherit"
                component={RouterLink}
                to="/influencers"
                sx={{
                  border:
                    location.pathname === "/influencers"
                      ? "2px solid white"
                      : "none",
                  borderRadius: "5px",
                  marginRight: "8px",
                }}
              >
                <PeopleAltIcon sx={{ fontSize: "2rem", mr: 1 }} />
                <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
                  المؤثرين
                </Typography>
              </Button>
            )}
            {user.type === "Influencer" && (
              <Button
                color="inherit"
                component={RouterLink}
                to="/businesses"
                sx={{
                  border:
                    location.pathname === "/businesses"
                      ? "2px solid white"
                      : "none",
                  borderRadius: "5px",
                  marginRight: "8px",
                }}
              >
                <BusinessCenterIcon sx={{ fontSize: "2rem", mr: 1 }} />
                <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
                  التجار
                </Typography>
              </Button>
            )}
            <Button
              color="inherit"
              component={RouterLink}
              to="/chat"
              sx={{
                border:
                  location.pathname === "/chat" ? "2px solid white" : "none",
                borderRadius: "5px",
                marginRight: "8px",
              }}
            >
              <ChatIcon sx={{ fontSize: "2rem", mr: 1 }} />
              <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
                المحادثات
              </Typography>
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/campaign"
              sx={{
                border:
                  location.pathname === "/campaign"
                    ? "2px solid white"
                    : "none",
                borderRadius: "5px",
              }}
            >
              <CampaignIcon sx={{ fontSize: "2rem", mr: 1 }} />
              <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
                الحملات
              </Typography>
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
              <MenuItem onClick={handleProfileDialogOpen}>معلوماتي</MenuItem>
              <MenuItem onClick={handleMyAcountOpen}>حسابي</MenuItem>
              <MenuItem onClick={handleLogoutDialogOpen}>تسجيل الخروج</MenuItem>
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
              انضم لنا
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              تسجيل الدخول
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
