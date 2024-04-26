import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import CampaignNotes from "../components/CampaignNotes";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useNavigate } from "react-router-dom";

export default function CampaginPage() {
  let { campaignId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const fetchDataAndUpdateCampaign = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/campaign/${campaignId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
      console.log(response.data);
      setCampaign(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataAndUpdateCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId, user.token, user.type]);
  const onApproveOrReject = async (isApproved) => {
    console.log("Approving");
    try {
      await axios.patch(
        `http://localhost:3001/campaign/${campaign._id}`,
        { isApproved: isApproved },
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
      if (!isApproved) {
        navigate(`/campaign`);
      }
      fetchDataAndUpdateCampaign();
      console.log("after");
    } catch (error) {
      console.error("Error updating campaign:", error);
      throw new Error("Failed to update campaign");
    }
  };

  if (!campaign) {
    return <Typography>جاري التحميل...</Typography>;
  }
  return (
    <Box sx={{ flexGrow: 1, pl: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={7}>
          <Box>
            <Typography variant="h4"> مع: {campaign.receiverName}</Typography>
            <Avatar
              src={campaign.receiverImage}
              alt="Receiver Avatar"
              sx={{ width: 300, height: 300 }}
            />
            <Typography variant="h6">
              اسم الحملة: {campaign.campaignName}
            </Typography>
            <Typography variant="h6">المبلغ: {campaign.amount} ريال</Typography>
            <Typography variant="h6">الحالة: {campaign.status}</Typography>
            <Typography variant="h6">
              في تاريخ: {campaign.date.slice(0, 10)}
            </Typography>
            <Typography variant="h6">الشروط:</Typography>
            <List>
              {campaign.conditions.map((condition, index) => (
                <ListItem key={index}>
                  <ListItemText primary={condition.content} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid xs={5}>
          {campaign.isApproved ? (
            <CampaignNotes campaign={campaign} />
          ) : user.type === "Influencer" ? (
            <Box>
              <Typography variant="h4" gutterBottom>
                بانتظار الموافقة على الطلب
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => onApproveOrReject(true)}
                  color="success"
                  sx={{ mr: 2 }}
                >
                  <ThumbUpIcon sx={{ fontSize: 30 }} />
                </Button>
                <Button
                  variant="contained"
                  onClick={() => onApproveOrReject(false)}
                  color="error"
                >
                  <ThumbDownIcon sx={{ fontSize: 30 }} />
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" gutterBottom>
                بانتظار الموافقة على الطلب
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => onApproveOrReject(false)}
                  color="error"
                >
                  <DisabledByDefaultIcon sx={{ fontSize: 30 }} />
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
