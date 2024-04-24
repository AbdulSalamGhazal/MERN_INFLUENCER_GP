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

function BusinessCard({ business }) {
  return (
    <>
      <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}>
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
        <CardContent>
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
              <Chip key={index} label={platform} variant="outlined" />
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            الحجم: {business.size}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            العنوان: {business.address}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
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
