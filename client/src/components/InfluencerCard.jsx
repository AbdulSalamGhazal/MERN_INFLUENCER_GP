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

function InfluencerCard({ influencer }) {
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
            image={influencer.image}
            alt={influencer.name}
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
            {influencer.name}
          </Typography>
          <Typography variant="body2" color="text.primary" gutterBottom>
            {influencer.field}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {influencer.description.length > 100
              ? influencer.description.substring(0, 97) + "..."
              : influencer.description}
          </Typography>
          <Stack direction="row" spacing={1} mb={2}>
            {influencer.platforms.map((platform, index) => (
              <Chip key={index} label={platform} variant="outlined" />
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            متوسط التكلفة: {influencer.avg_cost.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            المتابعين: {influencer.total_followers.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            معدل التفاعل: {influencer.engagement_rate.toFixed(2)}%
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Link
            to={`/chat/${influencer.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton aria-label="إرسال رسالة" size="large">
              <EmailIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Link>
          <Link
            to={`/influencers/${influencer.id}`}
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

export default InfluencerCard;
