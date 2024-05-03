import { useState, useEffect } from "react";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import CampaignFilters from "../components/CampaignFilters";
import CampaignCard from "../components/CampaignCard";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function Campaign() {
  const { user, loading } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [filters, setFilters] = useState({ isApproved: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/campaign", {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
          params: filters,
        });
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (!loading) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, filters]);
  return (
    <Box>
      <CampaignFilters setFilters={setFilters} />
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
                <CampaignCard campaign={campaign} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Campaign;
