import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import {
  CheckCircle,
  HourglassEmpty,
  Receipt,
  DoneAll,
} from "@mui/icons-material";

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
import { MoneyOutlined, CalendarTodayOutlined } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";

import CampaignNotes from "../components/CampaignNotes";
import PaymentProcess from "../components/PaymentProcess";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import TimerIcon from "@mui/icons-material/Timer";
import TimelapseIcon from "@mui/icons-material/Timelapse";
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
  const getPaymentStyle = (status) => {
    let icon;
    let color;
    if (status === "لم يتم الدفع") {
      icon = <HourglassEmpty />;
      color = "orange";
    } else if (status === "تم التحويل، جاري التحقق") {
      icon = <Receipt />;
      color = "blue";
    } else if (status === "تم استلام المبلغ") {
      icon = <CheckCircle />;
      color = "green";
    } else if (status === "تم تحويل المبلغ") {
      icon = <DoneAll />;
      color = "green";
    } else {
      icon = null;
      color = "black";
    }
    return { icon: icon, color: color };
  };
  const getStatusStyle = (status) => {
    let icon;
    let color;
    if (status === "لم يحن الموعد") {
      icon = <TimerIcon />;
      color = "pink";
    } else if (status === "جاري التنفيذ") {
      icon = <TimelapseIcon />;
      color = "red";
    } else if (status === "تم الانتهاء") {
      icon = <DoneAll />;
      color = "green";
    } else {
      icon = null;
      color = "black";
    }
    return { icon: icon, color: color };
  };
  if (!campaign) {
    return <Typography>جاري التحميل...</Typography>;
  } else {
    const { color: paymentColor, icon: paymentIcon } = getPaymentStyle(
      campaign.payment
    );
    const { color: statusColor, icon: statusIcon } = getStatusStyle(
      campaign.status
    );
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
                  <Typography variant="h5" style={{ color: statusColor }}>
                    {statusIcon}
                    {campaign.status}
                  </Typography>
                </Box>
                <Box sx={{ my: 3 }}>
                  <Typography variant="h5">حالة الدفع: </Typography>
                  <Typography variant="h5" style={{ color: paymentColor }}>
                    {paymentIcon}
                    {campaign.payment}
                  </Typography>

                  {user.type === "Business" &&
                    campaign.payment === "لم يتم الدفع" && (
                      <PaymentProcess campaignId={campaign._id} />
                    )}
                </Box>
                <CampaignNotes campaign={campaign} />
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
