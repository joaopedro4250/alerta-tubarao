// src/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";

export default function LoginPage() {
  const { t } = useTranslation();
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
        setErro(data.error || t("login.loginError"));
        setLoading(false);
        return;
      }

      //  Salva token normal
      localStorage.setItem("token", data.token);

      //  DETECTANDO SE SENHA É TEMPORÁRIA
      // regra: senhas temporárias têm 8 caracteres
      if (senha.length === 8) {
        localStorage.setItem("emailTemp", email); // usado para pré-preencher a tela de trocar senha
        navigate("/alterar-senha");
        return;
      }

      //  Login normal → manda para o mapa
      navigate("/map");

    } catch (err) {
      console.error(err);
      setErro(t("login.serverError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0e9ff]">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center"
        >
          <h1 className="text-2xl font-bold text-[#6A5ACD] mb-6">
            {t("login.title")}
          </h1>

          <input
            type="email"
            placeholder={t("login.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          <input
            type="password"
            placeholder={t("login.password")}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
          />

          <div className="text-right mb-4">
            <button
              type="button"
              className="text-sm text-[#6A5ACD] hover:underline"
              onClick={() => navigate("/recuperar-senha")}
            >
              {t("login.forgotPassword") || "Esqueci minha senha"}
            </button>
          </div>

          {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#6A5ACD] text-white py-2 rounded-lg hover:bg-[#5b4db8] transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? t("login.loading") : t("login.submit")}
          </button>
        </form>
      </main>

      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-8">
        <p>{t("footer")}</p>
      </footer>
    </div>
  );
}
