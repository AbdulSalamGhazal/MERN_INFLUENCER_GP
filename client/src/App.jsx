import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import Influencers from "./pages/influencers";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Container maxWidth="xl" sx={{ mt: 1, mb: 4 }}>
          <Navbar />
          <Routes>
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/home" element={<h1>Welcome</h1>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
