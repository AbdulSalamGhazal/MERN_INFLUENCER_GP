import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";
import BusinessFilters from "../components/BusinessFilters";
import BusinessCard from "../components/BusinessCard";
import axios from "axios";
import useAuth from "../../context/AuthContext";
function Businesses() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (user.type === "Business") {
      return navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/businesses", {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
          params: filters,
        });
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [navigate, user.type, filters, user.token]);
  return (
    <>
      <BusinessFilters setFilters={setFilters} />
      <Box sx={{ flexGrow: 1, pl: 1 }}>
        <Grid container spacing={2}>
          {businesses.map(
            (business) =>
              business.isActive && (
                <Grid xs={3} key={business.id}>
                  <BusinessCard business={business} />
                </Grid>
              )
          )}
        </Grid>
      </Box>
    </>
  );
}

export default Businesses;
