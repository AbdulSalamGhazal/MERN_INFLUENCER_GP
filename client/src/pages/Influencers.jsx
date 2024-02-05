import axios from "axios";
import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import InfluencersCards from "../components/InfluencersCards";
function Influencers() {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/influencers");
        setInfluencers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Filters />
      <InfluencersCards influencers={influencers} />
    </>
  );
}

export default Influencers;
