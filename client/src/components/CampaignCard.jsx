import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

export default function CampaignCard({ campaign }) {
  const getStatusBackgroundColor = () => {
    switch (campaign.status) {
      case "لم يحن الموعد":
        return "yellow";
      case "جاري التنفيذ":
        return "orange";
      case "تم الانتهاء":
        return "green";
      default:
        return "white";
    }
  };
  const formatCreatedAtDate = () => {
    const date = new Date(campaign.createdAt);
    return date.toLocaleDateString();
  };
  return (
    <Card
      sx={{
        display: "flex",
        my: 2,
      }}
    >
      <Box sx={{ position: "relative", width: 180 }}>
        <CardMedia
          component="img"
          sx={{ width: "100%", height: 180, objectFit: "cover" }}
          image={campaign.receiverImage}
          alt="Campaign Receiver Image"
        />
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            px: 1,
            py: 0,
            backgroundColor: "rgba(0, 0, 0, 1)",
            color: "white",
            textAlign: "center",
          }}
        >
          {campaign.receiverName}
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", pl: 1, width: "100%" }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {campaign.campaignName}
          </Typography>
          <Box
            sx={{
              backgroundColor: getStatusBackgroundColor(),
              borderRadius: "4px",
              padding: "4px 8px",
              display: "inline-block",
              mt: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.primary">
              الحالة: {campaign.status}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            تاريخ الإنشاء: {formatCreatedAtDate()}
          </Typography>
        </CardContent>
        <Box sx={{ alignSelf: "flex-end", pr: 1 }}>
          <Link
            to={`/campaign/${campaign.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton aria-label="تفاصيل أكثر" size="large">
              <InfoIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Card>
  );
}
