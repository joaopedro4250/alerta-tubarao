// src/RecuperarSenha.jsx
import React, { useState } from "react";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleRecuperar = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const resp = await fetch(
        "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/recuperarSenha",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const data = await resp.json();
      setMensagem(data.message || "Confira seu email para redefinir a senha!");
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao tentar recuperar a senha.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0e9ff]">
      <form
        onSubmit={handleRecuperar}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center"
      >
        <h1 className="text-2xl font-bold text-[#6A5ACD] mb-6">
          Recuperar Senha
        </h1>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-[#6A5ACD] outline-none"
        />
        <button
          type="submit"
          className="w-full bg-[#6A5ACD] text-white py-2 rounded-lg hover:bg-[#5b4db8] transition"
        >
          Enviar
        </button>
        {mensagem && <p className="mt-4 text-green-500">{mensagem}</p>}
      </form>
    </div>
  );
}
