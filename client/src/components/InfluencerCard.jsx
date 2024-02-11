import {
  Badge,
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
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";

function InfluencerCard({ influencer }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited); // Toggle favorite state
    // Add functionality to update favorite status in your data or state management system here
  };

  const handleMoreDetails = () => {
    // Implement navigation or action to show more details
    console.log("More details action triggered");
    // For example, you could use React Router to navigate to a detailed view
  };
  const handleMessageClick = () => {
    // Placeholder for send message functionality
    console.log("Send message action triggered");
  };
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
          {influencer.verified && (
            <Badge
              color="primary"
              badgeContent="✓"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                ".MuiBadge-badge": {
                  backgroundColor: "#44b700",
                  color: "#ffffff",
                  border: `2px solid #ffffff`,
                  padding: "0 4px",
                },
              }}
            />
          )}
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
            Avg. Cost: ${influencer.avg_cost.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Followers: {influencer.total_followers.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Engagement Rate: {influencer.engagement_rate.toFixed(2)}%
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <IconButton
            onClick={handleFavoriteClick}
            aria-label="add to favorites"
            size="large"
          >
            {isFavorited ? (
              <FavoriteIcon color="error" sx={{ fontSize: 28 }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 28 }} />
            )}
          </IconButton>
          <IconButton
            onClick={handleMessageClick}
            aria-label="send message"
            size="large"
          >
            <EmailIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <IconButton
            onClick={handleMoreDetails}
            aria-label="more details"
            size="large"
          >
            <InfoIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default InfluencerCard;
