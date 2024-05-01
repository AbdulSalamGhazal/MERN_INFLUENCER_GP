import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import ChangePaymentAdmin from "../components/ChangePaymentAdmin";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

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
  const handleClearDispute = async (user, campaignId) => {
    try {
      await axios.patch(`http://localhost:3001/admin/dispute/${campaignId}`, {
        userType: user,
      });
    } catch (error) {
      console.log("Error fetching data");
    }
  };
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
                    <Grid container spacing={2}>
                      <Grid xs={4}>
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
                      </Grid>
                      <Grid xs={4}>
                        <Box sx={{ mb: 3 }}>
                          <TextField
                            fullWidth
                            defaultValue={campaign.status}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Box>
                        <ChangePaymentAdmin campaign={campaign} />
                        <Typography sx={{ my: 2 }}>
                          {campaign.paymentNote}
                        </Typography>
                      </Grid>
                      <Grid xs={4}>
                        <Box sx={{ mb: 3 }}>
                          <TextField
                            defaultValue={campaign.influencerDispute}
                            InputProps={{
                              readOnly: true,
                            }}
                            sx={{ width: "70%" }}
                          />
                          <Button
                            variant="outlined"
                            sx={{ width: "20px", mx: 2, height: "52px" }}
                            onClick={() =>
                              handleClearDispute("influencer", campaign._id)
                            }
                          >
                            انهاء
                          </Button>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                          <TextField
                            defaultValue={campaign.BusinessDispute}
                            InputProps={{
                              readOnly: true,
                            }}
                            sx={{ width: "70%" }}
                          />
                          <Button
                            variant="outlined"
                            sx={{ width: "20px", mx: 2, height: "52px" }}
                            onClick={() =>
                              handleClearDispute("Business", campaign._id)
                            }
                          >
                            انهاء
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Box sx={{ alignSelf: "flex-end", pr: 1 }}></Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
