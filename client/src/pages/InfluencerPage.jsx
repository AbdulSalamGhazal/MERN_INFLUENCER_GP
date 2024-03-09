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
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InterestIcon from "@mui/icons-material/Extension";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";

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
    return <Typography>جاري التحميل...</Typography>;
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
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>
                    {"البريد الإلكتروني"}
                  </div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>{influencer.email}</div>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocationOnIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<div style={{ textAlign: "right" }}>{"الموقع"}</div>}
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {influencer.location}
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GroupIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>{"المتابعين"}</div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {influencer.total_followers.toLocaleString()}
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FavoriteIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>{"متوسط الإعجابات"}</div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {`${influencer.avg_likes.toLocaleString()}`}
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CommentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>{"متوسط التعليقات"}</div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {`${influencer.avg_comments.toLocaleString()}`}
                  </div>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            شروط خاصة
          </Typography>
          <List>
            {influencer.special_requriements.map((requirement, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <CheckCircleOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div style={{ textAlign: "right" }}>{requirement}</div>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" gutterBottom>
            اهتمامات شخصية
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <InterestIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>
                    {influencer.personal_interests}
                  </div>
                }
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" gutterBottom>
            تفاصيل الجمهور
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PeopleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>{"موقع الجمهور"}</div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {influencer.audience_location.join(", ")}
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PeopleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>{"فئة عمر الجمهور"}</div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {influencer.audience_age_rang}
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PeopleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>{"نسبة نوع الجمهور"}</div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {`${influencer.audience_gender * 100}% ذكور`}
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PeopleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>{"اهتمامات الجمهور"}</div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {influencer.audience_interests.join(", ")}
                  </div>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            size="large"
            startIcon={<FavoriteIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            إضافة للمفضلة
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Link
            to={`/chat/${influencer.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default InfluencerPage;
