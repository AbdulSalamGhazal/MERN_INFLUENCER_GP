import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import Influencers from "./pages/influencers";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import InfluencerSignup from "./pages/InfluencerSignup";
import BusinessSignup from "./pages/BusinessSignup";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container maxWidth="xl" sx={{ mt: 1, mb: 4 }}>
          <Navbar />
          <Routes>
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/home" element={<div><h1>Welcome</h1><a href="/login">login</a><br /><a href="/signup">signup</a></div>} />
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
