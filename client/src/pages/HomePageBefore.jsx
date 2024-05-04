import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2/Grid2";


const HomePageBefore = () => {
  return (
    <Box sx={{ height: "75vh", padding: 0, margin: 0 }}>

      <Grid 
      container 
      sx={{
        height: '100%',
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}

      >

      {/* Left half: Image */}
      <Grid
        item
        xs={6}
        sx={{
          maxHeight: '100%',
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 2rem",
        }}
        >
        {/* Title */}
        <Typography variant="h2" color={'primary'} sx={{ textAlign: "center", mb: 2, fontWeight: 700 }}>
          هنا حيث يلتقي المؤثرين والتجار
        </Typography>

        {/* Secondary Title */}
        <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
          منصة متكاملة لإطلاق حملتك الإعلانية عبر أفضل المؤثرين في المملكة العربية السعودية
        </Typography>

        {/* Buttons */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              href='/signup/influencer'
            >
             انضم كمؤثر
            </Button>
          </Grid>
            {/* Right half: Content */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              href='/signup/business'
            >
              انضم كتاجر
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          flex: "1",
          maxHeight: '100%',
          display: "flex",
          // justifyContent: "center",
          // alignItems: 'center'
        }}
      >
        <img
          src="https://res.cloudinary.com/druqrnvxt/image/upload/v1714647518/MERN_INFLUENCER_GP/communication-social-media-icons-smartphone-device_ig18gq.png"
          alt="Home page image"
          style={{ height: 'auto', maxHeight: "100%", maxWidth: '100%', objectFit: 'contain' }}
        />
      </Grid>
      </Grid>

    </Box>
  )
};

export default HomePageBefore;