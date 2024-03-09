import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../context/protectedRoute";
import Container from "@mui/material/Container";
import Home from "./pages/Home";
import Influencers from "./pages/influencers";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chat from "./pages/Chat";
import InfluencerSignup from "./pages/InfluencerSignup";
import BusinessSignup from "./pages/BusinessSignup";
import Signup from "./pages/Signup";
import Campaign from "./pages/Campaign";
import InfluencerPage from "./pages/InfluencerPage";
import MyAccount from "./pages/MyAccount";
function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/influencers"
            element={
              <ProtectedRoute>
                <Influencers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/influencers/:influencerId"
            element={
              <ProtectedRoute>
                <InfluencerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:recieverId"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route path="/campaign" element={<Campaign />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/influencer" element={<InfluencerSignup />} />
          <Route path="/signup/business" element={<BusinessSignup />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
