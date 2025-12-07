// src/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";

export default function RegisterPage() {
  const { t } = useTranslation();
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
      setErro(t("register.fillAllFields"));
      return;
    }

    if (senha !== confirmarSenha) {
      setErro(t("register.passwordMismatch"));
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
          setErro(data.error || t("register.sendCodeError"));
          setLoading(false);
          return;
        }

        setMensagem(t("register.codeSent", { email }));
        setCodigoEnviado(true);
      } catch (err) {
        console.error(err);
        setErro(t("register.serverError"));
      } finally {
        setLoading(false);
      }
      return;
    }

    // Passo 2: registrar usuário com código
    if (!codigo) {
      setErro(t("register.code") + " " + t("register.fillAllFields"));
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
        setErro(data.error || t("register.registerError"));
        setLoading(false);
        return;
      }

      alert(t("register.success"));
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErro(t("register.serverError"));
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
            {t("register.title")}
          </h1>

          <input
            type="text"
            placeholder={t("register.name")}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          <input
            type="email"
            placeholder={t("register.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
            disabled={codigoEnviado}
          />

          <input
            type="password"
            placeholder={t("register.password")}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          <input
            type="password"
            placeholder={t("register.confirmPassword")}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          {codigoEnviado && (
            <input
              type="text"
              placeholder={t("register.code")}
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
                ? t("register.registering")
                : t("register.sendingCode")
              : t("register.submit")}
          </button>

          <p className="mt-4 text-gray-600 text-sm">
            {t("register.loginLink")}
            <span
              className="text-[#6A5ACD] font-semibold cursor-pointer hover:underline ml-1"
              onClick={() => navigate("/login")}
            >
              {t("login.submit")}
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
