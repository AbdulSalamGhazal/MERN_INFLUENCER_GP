import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Influencers from "./pages/influencers";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/influencers" element={<Influencers />} />
          <Route path="/home" element={<h1>Welcome</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
