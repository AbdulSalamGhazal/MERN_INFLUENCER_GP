import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Home from "./pages/Home";
import Influencers from "./pages/influencers";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import InfluencerSignup from "./pages/InfluencerSignup";
import BusinessSignup from "./pages/BusinessSignup";
import Signup from "./pages/Signup";
import InfluencerPage from "./pages/InfluencerPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
          <Routes>
            <Route path="/influencers" element={<Influencers />} />
            <Route
              path="/influencers/:influencerId"
              element={<InfluencerPage />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/influencer" element={<InfluencerSignup />} />
            <Route path="/signup/business" element={<BusinessSignup />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
