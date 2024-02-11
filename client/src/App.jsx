import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import Influencers from "./pages/influencers";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
          <Routes>
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/home" element={<h1>Welcome</h1>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
