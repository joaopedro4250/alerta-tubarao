import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MapPage from "./MapPage";
import LoginPage from "./LoginPage";
import RecuperarSenha from "./RecuperarSenha";
import AlterarSenha from "./AlterarSenha";
import RegisterPage from "./RegisterPage";

import AdminDashboard from "./AdminDashboard";
import GerenciarPraia from "./GerenciarPraia";
import GerenciarPraias from "./GerenciarPraias";

import GerenciarAtaques from "./GerenciarAtaques"; 


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas administrativas */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/praias" element={<GerenciarPraia />} />
        <Route path="/admin/ataques" element={<GerenciarAtaques />} /> 
        <Route path="/gerenciarPraia" element={<GerenciarPraias />} />
      </Routes>
    </Router>
  );
}
