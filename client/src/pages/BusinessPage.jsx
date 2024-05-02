import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import GroupsIcon from "@mui/icons-material/Groups";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkIcon from "@mui/icons-material/Link";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Rating from "@mui/material/Rating";

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
  const getSocialMediaLabel = (platform) => {
    if (platform.includes("facebook")) {
      return (
        <>
          <FacebookIcon fontSize="small" /> فيس بوك
        </>
      );
    } else if (platform.includes("twitter")) {
      return (
        <>
          <TwitterIcon fontSize="small" /> تويتر
        </>
      );
    } else if (platform.includes("linkedin")) {
      return (
        <>
          <LinkedInIcon fontSize="small" /> لينكد إن
        </>
      );
    } else if (platform.includes("instagram")) {
      return (
        <>
          <InstagramIcon fontSize="small" /> إنستغرام
        </>
      );
    } else if (platform.includes("youtube")) {
      return (
        <>
          <LinkIcon fontSize="small" />
          سناب شات
        </>
      );
    } else if (platform.includes("tiktok")) {
      return (
        <>
          <LinkIcon fontSize="small" />
          تيك توك
        </>
      );
    } else if (platform.includes("snapchat")) {
      return (
        <>
          <YouTubeIcon fontSize="small" /> يوتيوب
        </>
      );
    } else {
      return platform;
    }
  };
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
      }}
    >
      <Box
        sx={{
          width: "70%",
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          border: "1px solid gray",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar src={business.image} sx={{ width: 200, height: 200, mb: 2 }}>
            <BusinessIcon sx={{ width: 60, height: 60 }} />
          </Avatar>
          <Typography variant="h4" gutterBottom>
            {business.companyName}
          </Typography>
        </Box>
        <Divider sx={{ height: "4px", backgroundColor: "#ccc", my: 3 }} />
        <Typography variant="h4" gutterBottom>
          الوصف
        </Typography>
        <Typography>{business.description}</Typography>
        <Divider sx={{ height: "4px", backgroundColor: "#ccc", my: 3 }} />
        <Typography variant="h4" gutterBottom>
          المعلومات الأساسية
        </Typography>
        <Divider />
        <List>
          <ListItem>
            <BusinessIcon sx={{ mx: 3 }} />
            <ListItemText primary="الصناعة" secondary={business.industry} />
          </ListItem>
          <ListItem>
            <EmailIcon sx={{ mx: 3 }} />
            <ListItemText
              primary="البريد الإلكتروني"
              secondary={business.email}
            />
          </ListItem>
          <ListItem>
            <LocationOnIcon sx={{ mx: 3 }} />
            <ListItemText primary="العنوان" secondary={business.address} />
          </ListItem>
          <ListItem>
            <LanguageIcon sx={{ mx: 3 }} />
            <ListItemText
              primary="رابط الموقع"
              secondary={business.websiteURL}
            />
          </ListItem>
          <ListItem>
            <GroupsIcon sx={{ mx: 3 }} />
            <ListItemText primary="الحجم" secondary={business.size} />
          </ListItem>
        </List>
        <Typography variant="h5" gutterBottom>
          روابط وسائل التواصل الاجتماعي
        </Typography>
        <Divider />
        <Stack direction="row" spacing={1} mb={2}>
          {business.socialMediaLinks.map((platform, index) => (
            <Link
              key={index}
              href={platform}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="none"
            >
              <Chip label={getSocialMediaLabel(platform)} variant="outlined" />
            </Link>
          ))}
        </Stack>

        <Divider sx={{ height: "4px", backgroundColor: "#ccc", my: 3 }} />
        <List>
          <Typography variant="h4" gutterBottom>
            الجمهور المستهدف
          </Typography>
          {business.targetAudience.map((audience, index) => (
            <ListItem key={index}>
              <ListItemText primary={audience} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ height: "4px", backgroundColor: "#ccc", my: 3 }} />

        <Typography variant="h4" gutterBottom>
          أهداف الحملة
        </Typography>
        <List>
          {business.campaignGoals.map((goal, index) => (
            <ListItem key={index}>
              <ListItemText primary={goal} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ height: "4px", backgroundColor: "#ccc", my: 3 }} />

        <Typography variant="h4" gutterBottom>
          الطلبات العامة
        </Typography>
        <List>
          {business.generalRequest.map((request, index) => (
            <ListItem key={index}>
              <ListItemText primary={request} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ height: "4px", backgroundColor: "#ccc", my: 3 }} />

        <Typography variant="h4" gutterBottom>
          نطاق الميزانية
        </Typography>
        <Typography>
          الحد الأدنى: {business.budgetRange.min}، الحد الأقصى:{" "}
          {business.budgetRange.max}
        </Typography>
        <Divider sx={{ height: "4px", backgroundColor: "#ccc", my: 3 }} />
        <Typography variant="h4" gutterBottom>
          التقييمات
        </Typography>
        {business.campaigns.map((campaign) => (
          <Typography variant="h6" key={campaign._id}>
            {campaign.raterName}:
            <Rating value={campaign.rate} size="medium" readOnly />
          </Typography>
        ))}

        <Link
          to={`/chat/${business._id}`}
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<EmailIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            إرسال رسالة
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default BusinessPage;
