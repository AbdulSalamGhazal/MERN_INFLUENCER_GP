import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Grid from "@mui/material/Unstable_Grid2";

export default function Admin() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/admin");
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ flexGrow: 1, pl: 1 }}>
      {campaigns.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          sx={{ mt: 5, fontSize: "50px" }}
        >
          لا يوجد حملات
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {campaigns.map((campaign, index) => (
            <Grid xs={12} key={index}>
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
                        <Typography
                          component="div"
                          variant="h3"
                          sx={{ flex: "1" }}
                        >
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
                          <ScheduleIcon sx={{ mr: 1 }} />{" "}
                          {campaign.date.slice(0, 10)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
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
                          {campaign.isApproved
                            ? "تم الموافقة"
                            : "لم يتم الموافقة"}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                          fontSize: 25,
                          fontFamily: "Nanum Gothic, sans-serif",
                        }}
                      >
                        {campaign.amount} ريال
                      </Typography>
                    </CardContent>
                    <Box sx={{ alignSelf: "flex-end", pr: 1 }}></Box>
                  </Box>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
