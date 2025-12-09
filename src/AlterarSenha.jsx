import { useState } from "react";
import { alterarSenha } from "./services/requests";

export default function AlterarSenha() {
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await alterarSenha(email, senhaAtual, novaSenha);

    if (result.error) {
      setMensagem("❌ " + result.error);
    } else {
      setMensagem("✔️ " + result.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Alterar Senha</h2>

        <label className="block mb-2">Email:</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2">Senha atual:</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-3"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
        />

        <label className="block mb-2">Nova senha:</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-3"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Alterar Senha
        </button>

        {mensagem && (
          <p className="mt-4 text-center font-semibold">
            {mensagem}
          </p>
        )}
      </form>
    </div>
  );
}
