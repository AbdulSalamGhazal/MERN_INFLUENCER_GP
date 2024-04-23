import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";

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
    <Link
      to={`/campaign/${campaign._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        sx={{
          display: "flex",
          my: 2,
        }}
      >
        <Box sx={{ position: "relative", width: 300 }}>
          <CardMedia
            component="img"
            sx={{ width: "100%", height: 250, objectFit: "cover" }}
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
          sx={{
            display: "flex",
            flexDirection: "column",
            pl: 1,
            width: "100%",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pr: 1,
              }}
            >
              <Typography component="div" variant="h3" sx={{ flex: "1" }}>
                {campaign.campaignName}
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  fontSize: 25,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ScheduleIcon sx={{ mr: 1 }} /> {campaign.date.slice(0, 10)}
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: getStatusBackgroundColor(),
                borderRadius: "4px",
                padding: "4px 8px",
                display: "inline-block",
                mt: 1,
              }}
            >
              <Typography variant="h5" color="text.primary">
                {campaign.status}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              تاريخ الإنشاء: {formatCreatedAtDate()}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
              }}
            >
              {campaign.isApproved ? (
                <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
              ) : (
                <CancelIcon sx={{ color: "red", mr: 1 }} />
              )}
              <Typography variant="button">
                {campaign.isApproved ? "تم الموافقة" : "لم يتم الموافقة"}
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ alignSelf: "flex-end", pr: 1 }}>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ fontSize: 25, fontFamily: "Nanum Gothic, sans-serif" }}
            >
              {campaign.amount} ريال
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}
