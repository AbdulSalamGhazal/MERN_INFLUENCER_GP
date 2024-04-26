import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkIcon from "@mui/icons-material/Link";
import YouTubeIcon from "@mui/icons-material/YouTube";

function BusinessCard({ business }) {
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
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          m: 2,
          boxShadow: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "100%",
          }}
        >
          <CardMedia
            component="img"
            image={business.image}
            alt={business.companyName}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {business.companyName}
          </Typography>
          <Typography variant="body2" color="text.primary" gutterBottom>
            {business.industry}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {business.description.length > 100
              ? business.description.substring(0, 97) + "..."
              : business.description}
          </Typography>
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
                <Chip
                  label={getSocialMediaLabel(platform)}
                  variant="outlined"
                />
              </Link>
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            الحجم: {business.size}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            العنوان: {business.address}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
          <Link
            to={`/chat/${business._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton aria-label="إرسال رسالة" size="large">
              <EmailIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Link>
          <Link
            to={`/businesses/${business._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton aria-label="تفاصيل أكثر" size="large">
              <InfoIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}

export default BusinessCard;
