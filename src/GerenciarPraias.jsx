import { useEffect, useState } from "react";

export default function GerenciarPraias() {
  const [praias, setPraias] = useState([]);

  const [novaPraia, setNovaPraia] = useState("");
  const [cidade, setCidade] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [descricao, setDescricao] = useState("");

  const [editando, setEditando] = useState(null);

  // 👉 Carrega as praias ao abrir a página
  useEffect(() => {
    fetch("https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/getPraias")
      .then((res) => res.json())
      .then((data) => {
        const arr = (data.praias || []).map((p) => ({
          nome: p.nome,
          cidade: p.cidade || "",
          latitude: p.lat || "",
          longitude: p.lng || "",
          descricao: p.descricao || "",
        }));

        setPraias(arr);
      })
      .catch(() => alert("Erro ao carregar praias"));
  }, []);

  // 👉 Criar nova praia
  async function criarPraia() {
    if (!novaPraia.trim() || !cidade.trim()) {
      alert("Nome e cidade são obrigatórios");
      return;
    }

    const body = {
      acao: "adicionar",
      nomeNovo: novaPraia,
      cidade,
      lat: latitude ? Number(latitude) : 0,
      lng: longitude ? Number(longitude) : 0,
      descricao: descricao || "",
    };

    const res = await fetch(
      "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/gerenciarPraia",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    alert(data.message);

    setPraias([
      ...praias,
      {
        nome: novaPraia,
        cidade,
        latitude: body.lat,
        longitude: body.lng,
        descricao: body.descricao,
      },
    ]);

    limparCampos();
  }

  // 👉 Excluir praia
  async function excluirPraia(nome) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    const res = await fetch(
      "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/gerenciarPraia",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acao: "deletar",
          nomeAntigo: nome, // ← CORREÇÃO IMPORTANTE
        }),
      }
    );

    const data = await res.json();
    alert(data.message);

    setPraias(praias.filter((p) => p.nome !== nome));
  }

  // 👉 Salvar edição
  async function salvarEdicao() {
    const body = {
      acao: "atualizar",
      nomeAntigo: editando.nomeAntigo,
    };

    if (novaPraia) body.nomeNovo = novaPraia;
    if (cidade) body.cidade = cidade;
    if (latitude !== "") body.lat = Number(latitude);
    if (longitude !== "") body.lng = Number(longitude);
    if (descricao !== "") body.descricao = descricao;

    const res = await fetch(
      "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/gerenciarPraia",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    alert(data.message);

    setPraias(
      praias.map((p) =>
        p.nome === editando.nomeAntigo
          ? {
              nome: novaPraia || p.nome,
              cidade: cidade || p.cidade,
              latitude: latitude || p.latitude,
              longitude: longitude || p.longitude,
              descricao: descricao || p.descricao,
            }
          : p
      )
    );

    setEditando(null);
    limparCampos();
  }

  // 👉 Entrar em modo de edição
  function editarPraia(p) {
    setEditando({ nomeAntigo: p.nome });

    setNovaPraia(p.nome || "");
    setCidade(p.cidade || "");
    setLatitude(p.latitude || "");
    setLongitude(p.longitude || "");
    setDescricao(p.descricao || "");
  }

  // 👉 Limpar inputs
  function limparCampos() {
    setNovaPraia("");
    setCidade("");
    setLatitude("");
    setLongitude("");
    setDescricao("");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Praias</h1>

      {/* FORMULÁRIO */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {editando ? "Editar Praia" : "Cadastrar Nova Praia"}
        </h2>

        <input
          type="text"
          placeholder="Nome da praia"
          className="w-full p-2 border rounded-md mb-3"
          value={novaPraia}
          onChange={(e) => setNovaPraia(e.target.value)}
        />

        <input
          type="text"
          placeholder="Cidade"
          className="w-full p-2 border rounded-md mb-3"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />

        <input
          type="text"
          placeholder="Latitude"
          className="w-full p-2 border rounded-md mb-3"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />

        <input
          type="text"
          placeholder="Longitude"
          className="w-full p-2 border rounded-md mb-3"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />

        <textarea
          placeholder="Descrição da praia"
          className="w-full p-2 border rounded-md mb-3"
          rows={3}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          onClick={editando ? salvarEdicao : criarPraia}
        >
          {editando ? "Salvar Alterações" : "Cadastrar"}
        </button>

        {editando && (
          <button
            className="w-full mt-3 bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500"
            onClick={() => {
              setEditando(null);
              limparCampos();
            }}
          >
            Cancelar Edição
          </button>
        )}
      </div>

      {/* LISTA DE PRAIAS */}
      <h2 className="text-2xl font-semibold mb-4">Praias Cadastradas</h2>

      <ul className="space-y-3">
        {praias.map((p, i) => (
          <li
            key={i}
            className="flex justify-between items-start bg-white p-3 rounded-md shadow"
          >
            <div>
              <p className="font-bold">{p.nome}</p>
              <p className="text-sm text-gray-600">{p.cidade}</p>
              <p className="text-sm text-gray-500">
                Lat: {p.latitude} | Long: {p.longitude}
              </p>
              <p className="text-sm text-gray-700 mt-1">{p.descricao}</p>
            </div>

            <div className="flex gap-3">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                onClick={() => editarPraia(p)}
              >
                Editar
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => excluirPraia(p.nome)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
