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
  IconButton,
} from "@mui/material";
import TextField from "@mui/material/TextField";

import { MoneyOutlined, CalendarTodayOutlined } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";

import CampaignNotes from "../components/CampaignNotes";
import PaymentProcess from "../components/PaymentProcess";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useNavigate } from "react-router-dom";
import ChangeStatus from "../components/ChangeStatus";

export default function CampaginPage() {
  let { campaignId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
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
      setCampaign(response.data);
      setIsDisabled(
        response.data.payment === "تم تحويل المبلغ" &&
          response.data.status === "تم الانتهاء"
      );
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
  } else {
    return (
      <Box sx={{ flexGrow: 1, pl: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                مع: {campaign.receiverName}
              </Typography>
              <Avatar
                src={campaign.receiverImage}
                alt="Receiver Avatar"
                sx={{ width: 200, height: 200, marginY: 2 }}
              />{" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", px: 3 }}>
                  <IconButton sx={{ marginRight: 1 }}>
                    <MoneyOutlined />
                  </IconButton>
                  <Typography variant="body1">
                    المبلغ: {campaign.amount} ريال
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", px: 3 }}>
                  <IconButton sx={{ marginRight: 1 }}>
                    <CalendarTodayOutlined />
                  </IconButton>
                  <Typography variant="body1">
                    في تاريخ: {campaign.date.slice(0, 10)}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h5" sx={{ marginY: 2 }}>
                اسم الحملة: {campaign.campaignName}
              </Typography>
              <Typography variant="h6">الشروط:</Typography>
              <List dense={false}>
                {campaign.conditions.map((condition, index) => (
                  <ListItem key={index} sx={{ paddingBottom: 1 }}>
                    <CheckIcon sx={{ marginRight: 1 }} />
                    <ListItemText primary={condition.content} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid xs={5}>
            {campaign.isApproved ? (
              <>
                <Box sx={{ my: 3 }}>
                  <Typography variant="h5">الحالة:</Typography>
                  <ChangeStatus
                    campaign={campaign}
                    isReadOnly={user.type === "Business"}
                    disabled={isDisabled}
                  />
                </Box>
                <Box sx={{ my: 3 }}>
                  <Typography variant="h5">حالة الدفع: </Typography>
                  <TextField
                    fullWidth
                    defaultValue={campaign.payment}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Box sx={{ my: 2 }}>
                    {user.type === "Business" &&
                      campaign.payment === "لم يتم الدفع" && (
                        <PaymentProcess fullWidth campaignId={campaign._id} />
                      )}
                  </Box>
                </Box>
                <Box sx={{ height: "500px" }}>
                  <CampaignNotes campaign={campaign} disabled={isDisabled} />
                </Box>
              </>
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
}
