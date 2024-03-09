import { Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../context/AuthContext";
function Businesses() {
  const { user } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    if (user.type === "Business") {
      return history("/");
    }
  }, [history, user.type]);
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

export default Businesses;
