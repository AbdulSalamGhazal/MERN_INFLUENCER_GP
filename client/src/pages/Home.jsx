import { Typography, Grid, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CampaignIcon from "@mui/icons-material/Campaign";
import DoneIcon from "@mui/icons-material/Done";
import TransferIcon from "@mui/icons-material/TransferWithinAStation";
import MoneyIcon from "@mui/icons-material/Money";
import StarIcon from "@mui/icons-material/Star";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        صفحة الأداء
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#fce4ec",
              border: "1px solid #f48fb1",
            }}
          >
            <ChatIcon style={{ fontSize: 40, color: "#e91e63" }} />
            <Typography variant="h6" gutterBottom>
              المحادثات
            </Typography>
            <Typography variant="h3" gutterBottom>
              7
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#ffe0b2",
              border: "1px solid #ffb74d",
            }}
          >
            <CampaignIcon style={{ fontSize: 40, color: "#ff9800" }} />
            <Typography variant="h6" gutterBottom>
              الحملات الجارية
            </Typography>
            <Typography variant="h3" gutterBottom>
              2
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#0A6847",
              border: "1px solid #7ABA78",
            }}
          >
            <DoneIcon style={{ fontSize: 40, color: "#7ABA78" }} />
            <Typography variant="h6" gutterBottom>
              الحملات المنتهية
            </Typography>
            <Typography variant="h3" gutterBottom>
              3
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#FF204E",
              border: "1px solid #ccc",
            }}
          >
            <TransferIcon style={{ fontSize: 40, color: "#9e9e9e" }} />
            <Typography variant="h6" gutterBottom>
              طلبات تحويل إلى حملة
            </Typography>
            <Typography variant="h3" gutterBottom>
              0
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#f0fff5",
              border: "1px solid #ccc",
            }}
          >
            <MoneyIcon style={{ fontSize: 40, color: "#009688" }} />
            <Typography variant="h6" gutterBottom>
              إجمالي المبلغ المعلق
            </Typography>
            <Typography variant="h3" gutterBottom>
              14500 ريال
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#F57D1F",
              border: "1px solid #ccc",
            }}
          >
            <StarIcon style={{ fontSize: 40, color: "#ffeb3b" }} />
            <Typography variant="h6" gutterBottom>
              متوسط التقييم
            </Typography>
            <Typography variant="h3" gutterBottom>
              4.5/5
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
