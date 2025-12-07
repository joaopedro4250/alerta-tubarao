// src/pages/AdminDashboard.jsx
import { useUser } from "./UserContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useUser();

  // CORREÇÃO AQUI: role precisa ser "admin"
  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl">
        Acesso restrito. Você não é administrador.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Painel do Administrador</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Link
          to="/gerenciarPraia"
          className="p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Gerenciar Praias
        </Link>

        <Link
          to="/admin/ataques"
          className="p-6 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Gerenciar Ataques
        </Link>

      </div>
    </div>
  );
}
