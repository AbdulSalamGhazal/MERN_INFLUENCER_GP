import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Filters from "../components/Filters";
import InfluencersCards from "../components/InfluencersCards";
import useAuth from "../../context/AuthContext";

function Influencers() {
  const [influencers, setInfluencers] = useState([]);
  const [filters, setFilters] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.type === "Influencer") {
      return navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/influencers", {
          params: filters,
        });
        setInfluencers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filters, user.type, navigate]);

  return (
    <>
      <Filters setFilters={setFilters} />
      <InfluencersCards influencers={influencers} />
    </>
  );
}

export default Influencers;
