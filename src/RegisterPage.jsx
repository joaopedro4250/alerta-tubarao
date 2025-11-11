import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // 👈 Usa o mesmo Header reutilizável

export default function RegisterPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    // Simulação de cadastro
    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0e9ff]">
      {/* Header igual ao do Home */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center"
        >
          <h1 className="text-2xl font-bold text-[#6A5ACD] mb-6">
            Registrar - Alerta Tubarão
          </h1>

          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-[#6A5ACD] text-white py-2 rounded-lg hover:bg-[#5b4db8] transition"
          >
            Registrar
          </button>

          <p className="mt-4 text-gray-600 text-sm">
            Já tem uma conta?{" "}
            <span
              className="text-[#6A5ACD] font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Faça login
            </span>
          </p>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-8">
        <p>© 2025 Alerta Tubarão — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
