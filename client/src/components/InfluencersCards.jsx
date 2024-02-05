import InfluencerCard from "./InfluencerCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

function InfluencersCards() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <InfluencerCard />
          </Grid>
          <Grid xs={3}>
            <InfluencerCard />
          </Grid>
          <Grid xs={3}>
            <InfluencerCard />
          </Grid>
          <Grid xs={3}>
            <InfluencerCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default InfluencersCards;
