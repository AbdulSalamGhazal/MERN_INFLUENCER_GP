import InfluencerCard from "./InfluencerCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

function InfluencersCards({ influencers }) {
  return (
    <>
      <Box sx={{ flexGrow: 1, pl: 1 }}>
        <Grid container spacing={2}>
          {influencers.map((influencer) => (
            <Grid item xs={3} key={influencer.id}>
              <InfluencerCard influencer={influencer} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default InfluencersCards;
