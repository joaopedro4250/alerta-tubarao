import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // 👈 Importa o Header reutilizável

export default function LoginPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (usuario === "admin" && senha === "1234") {
      navigate("/map");
    } else {
      setErro("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0e9ff]">
      {/* Header igual ao Home */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center"
        >
          <h1 className="text-2xl font-bold text-[#6A5ACD] mb-6">
            Login - Alerta Tubarão
          </h1>

          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-[#6A5ACD] text-white py-2 rounded-lg hover:bg-[#5b4db8] transition"
          >
            Entrar
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-8">
        <p>© 2025 Alerta Tubarão — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
