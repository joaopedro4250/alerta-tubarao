import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MapPage from "./MapPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

import AdminDashboard from "./AdminDashboard";
import GerenciarPraia from "./GerenciarPraia";
import GerenciarAtaque from "./GerenciarAtaque";
import GerenciarPraias from "./GerenciarPraias";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas administrativas */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/praias" element={<GerenciarPraia />} />
        <Route path="/admin/ataques" element={<GerenciarAtaque />} />
        <Route path="/gerenciarPraia" element={<GerenciarPraias />} />
      </Routes>
    </Router>
  );
}
