// import {useState} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function CampaignCard({ campaign }) {
  const getStatusBackgroundColor = () => {
    switch (campaign.status) {
      case "لم يحن الوقت":
        return "yellow"; // Background color for "لم يحن الوقت"
      case "جاري التنفيذ":
        return "orange"; // Background color for "جاري التنفيذ"
      case "تم الانتهاء":
        return "green"; // Background color for "تم الانتهاء"
      default:
        return "white"; // Default background color
    }
  };
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 150, height: "100%", objectFit: "cover" }}
        image={campaign.receiverImage}
        alt="Campaign Receiver Image"
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {campaign.campaignName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            مع {campaign.receiverName}
          </Typography>
          <Box
            sx={{
              backgroundColor: getStatusBackgroundColor(),
              borderRadius: "4px",
              padding: "4px 8px",
              display: "inline-block",
              marginTop: "8px",
            }}
          >
            <Typography variant="subtitle2" color="text.primary">
              الحالة: {campaign.status}
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button variant="contained" color="primary">
            تفاصيل أكثر
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
