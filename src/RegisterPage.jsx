// src/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro("");
    setMensagem("");

    // Valida campos
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    if (!codigoEnviado) {
      // Passo 1: enviar código
      try {
        const response = await fetch(
          "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/sendCode",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setErro(data.error || "Erro ao enviar código");
          setLoading(false);
          return;
        }

        setMensagem(`Código enviado para ${email}`);
        setCodigoEnviado(true);
      } catch (err) {
        console.error(err);
        setErro("Erro de conexão com o servidor.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Passo 2: registrar usuário com código
    if (!codigo) {
      setErro("Digite o código de confirmação enviado para seu e-mail!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/registerUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha, codigo }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao registrar!");
        setLoading(false);
        return;
      }

      alert("Usuário registrado com sucesso!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErro("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0e9ff]">
      <Header />

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
            disabled={codigoEnviado}
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

          {codigoEnviado && (
            <input
              type="text"
              placeholder="Código de confirmação"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
            />
          )}

          {mensagem && <p className="text-green-600 mb-4">{mensagem}</p>}
          {erro && <p className="text-red-500 mb-4">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-[#6A5ACD] text-white py-2 rounded-lg hover:bg-[#5b4db8] transition"
            disabled={loading}
          >
            {loading
              ? codigoEnviado
                ? "Registrando..."
                : "Enviando código..."
              : "Registrar"}
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

      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-8">
        <p>© 2025 Alerta Tubarão — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
