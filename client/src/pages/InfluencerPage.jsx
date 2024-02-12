import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InterestIcon from "@mui/icons-material/Extension";
import PeopleIcon from "@mui/icons-material/People";

function InfluencerPage() {
  let { influencerId } = useParams();
  const [influencer, setInfluencer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/influencers/${influencerId}`
        );

        setInfluencer(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [influencerId]);
  if (!influencer) {
    return <Typography>Loading...</Typography>;
  }

  // need to show field, verified, avg_cost,  engagement_rate
  // and add "send a message" button
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={influencer.image}
            alt={influencer.name}
            sx={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            gutterBottom
            variant="h3"
            component="h1"
            color="primary.main"
          >
            {influencer.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {influencer.description}
          </Typography>
          <Stack direction="row" spacing={1} mb={2}>
            {influencer.platforms.map((platform) => (
              <Chip key={platform} label={platform} color="primary" />
            ))}
          </Stack>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary={influencer.email} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocationOnIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Location"
                secondary={influencer.location}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GroupIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Total Followers"
                secondary={`${influencer.total_followers.toLocaleString()}`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FavoriteIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Average Likes"
                secondary={`${influencer.avg_likes.toLocaleString()}`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CommentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Average Comments"
                secondary={`${influencer.avg_comments.toLocaleString()}`}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Special Requirements
          </Typography>
          <List>
            {influencer.special_requriements.map((requirement, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <CheckCircleOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={requirement} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Personal Interests
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <InterestIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={influencer.personal_interests} />
            </ListItem>
          </List>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Audience Details
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PeopleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Audience Location"
                secondary={influencer.audience_location.join(", ")}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PeopleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Audience Age Range"
                secondary={influencer.audience_age_rang}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PeopleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Audience Gender Ratio"
                secondary={`${influencer.audience_gender * 100}% Male`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PeopleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Audience Interests"
                secondary={influencer.audience_interests.join(", ")}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default InfluencerPage;
