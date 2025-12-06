import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const resp = await fetch(
        "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/loginUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), senha }),
        }
      );

      const data = await resp.json();
      if (!resp.ok) {
        setErro(data.error || "Erro ao fazer login");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      // opcional: salvar info do usuário decodificando token se quiser mostrar o nome
      navigate("/map");
    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0e9ff]">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
          <h1 className="text-2xl font-bold text-[#6A5ACD] mb-6">Login - Alerta Tubarão</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#6A5ACD] text-white py-2 rounded-lg hover:bg-[#5b4db8] transition ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </main>

      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-8">
        <p>© 2025 Alerta Tubarão — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
