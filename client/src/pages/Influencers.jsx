import axios from "axios";
import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import InfluencersCards from "../components/InfluencersCards";
function Influencers() {
  const [influencers, setInfluencers] = useState([]);
  const [filters, setFilters] = useState({});
  useEffect(() => {
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
  }, [filters]);

  return (
    <>
      <Filters setFilters={setFilters} />
      <InfluencersCards influencers={influencers} />
    </>
  );
}

export default Influencers;
