import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

export default function CampaginPage() {
  let { campaignId } = useParams();
  const { user } = useAuth();

  const [campaign, setCampaign] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [campaignId, user.token, user.type]);
  if (!campaign) {
    return <Typography>جاري التحميل...</Typography>;
  }
  return (
    <Box sx={{ flexGrow: 1, pl: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <h1>{campaign.campaignName}</h1>
        </Grid>
        <Grid sx={{ background: "gray" }} xs={4}>
          before approve: approve/cancel for incluencer, cancel for business
          after approve: log message-like system, using message model
        </Grid>
      </Grid>
    </Box>
  );
}
