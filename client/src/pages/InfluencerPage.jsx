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
  CardMedia,
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
import CropFreeIcon from "@mui/icons-material/CropFree";
import GradeIcon from "@mui/icons-material/Grade";
import SellIcon from "@mui/icons-material/Sell";
import Rating from "@mui/material/Rating";
import useAuth from "../../context/AuthContext";

function InfluencerPage() {
  let { influencerId } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/influencers/${influencerId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token} ${user.type}`,
            },
          }
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

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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
                  <CropFreeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<div style={{ textAlign: "right" }}>{"المجال"}</div>}
                secondary={
                  <div style={{ textAlign: "right" }}>{influencer.field}</div>
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
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GradeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>{"درجة التفاعل"}</div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {`%${influencer.engagement_rate.toLocaleString()}`}
                  </div>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SellIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div style={{ textAlign: "right" }}>{"متوسط التكلفة"}</div>
                }
                secondary={
                  <div style={{ textAlign: "right" }}>
                    {`${influencer.avg_cost.toLocaleString()} ريال سعودي`}
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
        <Grid xs={12}>
          <Typography variant="h4" gutterBottom sx={{ mx: 4 }}>
            التقييمات
          </Typography>
          {influencer.campaigns.map((campaign) => (
            <Box
              key={campaign._id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h6" sx={{ justifyContent: "center" }}>
                {campaign.raterName}:
                <Rating value={campaign.rate} size="medium" readOnly />
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12}>
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
