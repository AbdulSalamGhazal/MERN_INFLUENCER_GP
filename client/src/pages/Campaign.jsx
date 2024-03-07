import { Typography, Box } from "@mui/material";

function UnderDevelopmentPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" component="h1" color="primary.main">
        Under Development
      </Typography>
    </Box>
  );
}

export default UnderDevelopmentPage;
