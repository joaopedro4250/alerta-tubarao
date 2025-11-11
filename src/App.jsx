import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MapPage from "./MapPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
