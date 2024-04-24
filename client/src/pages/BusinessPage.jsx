import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../context/AuthContext";

const BusinessPage = () => {
  const { user } = useAuth();

  let { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/businesses/${businessId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token} ${user.type}`,
            },
          }
        );

        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [businessId]);
  if (!business) {
    return <Typography>جاري التحميل...</Typography>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#f0f0f0",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {business.companyName}
      </Typography>
      <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
        <BusinessIcon sx={{ width: 60, height: 60 }} />
      </Avatar>
      <Box sx={{ width: "70%", bgcolor: "white", p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Basic Information
        </Typography>
        <Divider />
        <List>
          <ListItem>
            <BusinessIcon />
            <ListItemText primary="Industry" secondary={business.industry} />
          </ListItem>
          <ListItem>
            <EmailIcon />
            <ListItemText primary="Email" secondary={business.email} />
          </ListItem>
          <ListItem>
            <LocationOnIcon />
            <ListItemText primary="Address" secondary={business.address} />
          </ListItem>
          <ListItem>
            <LanguageIcon />
            <ListItemText
              primary="Website URL"
              secondary={business.websiteURL}
            />
          </ListItem>
        </List>
        <Typography variant="h5" gutterBottom>
          Social Media Links
        </Typography>
        <Divider />
        <List>
          {business.socialMediaLinks.map((link, index) => (
            <ListItem key={index}>
              {link.includes("facebook") ? (
                <FacebookIcon />
              ) : link.includes("twitter") ? (
                <TwitterIcon />
              ) : link.includes("linkedin") ? (
                <LinkedInIcon />
              ) : (
                <LanguageIcon />
              )}
              <ListItemText primary={link} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h5" gutterBottom>
          Description
        </Typography>
        <Divider />
        <Typography>{business.description}</Typography>
      </Box>
    </Box>
  );
};

export default BusinessPage;
