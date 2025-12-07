import { useEffect, useState } from "react";

export default function GerenciarAtaques() {
  const [ataques, setAtaques] = useState([]);
  const [praias, setPraias] = useState([]);
  const [busca, setBusca] = useState("");

  const [novaPraiaId, setNovaPraiaId] = useState("");
  const [novaData, setNovaData] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  const [editando, setEditando] = useState(null);
  const [ataqueEditando, setAtaqueEditando] = useState({});

  const [abertoPorPraia, setAbertoPorPraia] = useState({}); // para o acordeão

  // ================================
  // CARREGAR PRAIAS
  // ================================
  useEffect(() => {
    fetch("https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/getPraias")
      .then((r) => r.json())
      .then((data) => setPraias(data.praias || []));
  }, []);

  // ================================
  // CARREGAR ATAQUES
  // ================================
  const carregarAtaques = () => {
    fetch("https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/getAtaques")
      .then((r) => r.json())
      .then((data) => setAtaques(data.ataques || []));
  };

  useEffect(() => {
    carregarAtaques();
  }, []);

  // ================================
  // ADICIONAR ATAQUE
  // ================================
  const adicionarAtaque = async () => {
    if (!novaPraiaId || !novaData || !novaDescricao) {
      alert("Preencha todos os campos!");
      return;
    }

    const res = await fetch(
      "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/gerenciarAtaque",
      {
        method: "POST",
        body: JSON.stringify({
          acao: "adicionar",
          praiaId: novaPraiaId,
          data: novaData,
          descricao: novaDescricao,
        }),
      }
    );

    const data = await res.json();
    alert(data.message || data.error);

    setNovaPraiaId("");
    setNovaData("");
    setNovaDescricao("");

    carregarAtaques();
  };

  // ================================
  // ATUALIZAR ATAQUE
  // ================================
  const salvarEdicao = async (id) => {
    const ataqueOriginal = ataques.find((a) => a.id === id);

    // pegar cada campo com fallback para valor original
    const praiaId = ataqueEditando[id]?.praiaId || ataqueOriginal.praiaId;
    const data = ataqueEditando[id]?.data || ataqueOriginal.data;
    const descricao = ataqueEditando[id]?.descricao || ataqueOriginal.descricao;

    if (!praiaId || !data || !descricao) {
      alert("Nenhum campo pode estar vazio!");
      return;
    }

    const res = await fetch(
      "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/gerenciarAtaque",
      {
        method: "POST",
        body: JSON.stringify({
          acao: "atualizar",
          id,
          praiaId,
          data,
          descricao,
        }),
      }
    );

    const response = await res.json();
    alert(response.message || response.error);

    setEditando(null);
    setAtaqueEditando((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    carregarAtaques();
  };

  // ================================
  // DELETAR ATAQUE
  // ================================
  const deletarAtaque = async (id) => {
    const res = await fetch(
      "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/gerenciarAtaque",
      {
        method: "POST",
        body: JSON.stringify({
          acao: "deletar",
          id,
        }),
      }
    );

    const data = await res.json();
    alert(data.message || data.error);
    carregarAtaques();
  };

  // ================================
  // FILTRAR ATAQUES POR PRAIA OU DESCRIÇÃO
  // ================================
  const ataquesFiltrados = ataques.filter((a) => {
    const praiaNome = praias.find((p) => p.praiaId === a.praiaId)?.nome || "";
    return (
      a.descricao?.toLowerCase().includes(busca.toLowerCase()) ||
      praiaNome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  // ================================
  // AGRUPAR POR PRAIA
  // ================================
  const ataquesPorPraia = praias
    .map((p) => ({
      praia: p,
      ataques: ataquesFiltrados.filter((a) => a.praiaId === p.praiaId),
    }))
    .filter((g) => g.ataques.length > 0);

  // ================================
  // FUNÇÃO PARA COR DO CARD
  // ================================
  const corAtaque = (quantidade) => {
    if (quantidade <= 3) return "bg-green-200";
    if (quantidade <= 9) return "bg-yellow-200";
    return "bg-red-200";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Ataques</h1>

      {/* CARD DE CADASTRAR */}
      <div className="p-4 border rounded-lg mb-4">
        <h2 className="font-bold mb-2">Registrar novo ataque</h2>

        <select
          className="border p-2 w-full mb-2"
          value={novaPraiaId}
          onChange={(e) => setNovaPraiaId(e.target.value)}
        >
          <option value="">Selecione a praia</option>
          {praias.map((p) => (
            <option key={p.praiaId} value={p.praiaId}>
              {p.nome} - {p.cidade}
            </option>
          ))}
        </select>

        <input
          className="border p-2 w-full mb-2"
          type="date"
          value={novaData}
          onChange={(e) => setNovaData(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Descrição"
          value={novaDescricao}
          onChange={(e) => setNovaDescricao(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={adicionarAtaque}
        >
          Registrar Ataque
        </button>
      </div>

      {/* BARRA DE PESQUISA */}
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Buscar ataques por praia ou descrição..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* LISTA DE ATAQUES AGRUPADOS POR PRAIA (ACORDEÃO) */}
      {ataquesPorPraia.map((grupo) => (
        <div
          key={grupo.praia.praiaId}
          className="mb-4 border rounded-lg overflow-hidden"
        >
          <div
            className="bg-gray-200 p-3 cursor-pointer flex justify-between items-center"
            onClick={() =>
              setAbertoPorPraia((prev) => ({
                ...prev,
                [grupo.praia.praiaId]: !prev[grupo.praia.praiaId],
              }))
            }
          >
            <span className="font-bold text-lg">
              {grupo.praia.nome} ({grupo.ataques.length})
            </span>
            <span>{abertoPorPraia[grupo.praia.praiaId] ? "▲" : "▼"}</span>
          </div>

          {abertoPorPraia[grupo.praia.praiaId] &&
            grupo.ataques.map((ataque) => (
              <div
                key={ataque.id}
                className={`p-4 border-t ${corAtaque(grupo.ataques.length)}`}
              >
                {editando === ataque.id ? (
                  <>
                    <select
                      className="border p-2 w-full mb-2"
                      value={ataqueEditando[ataque.id]?.praiaId || ataque.praiaId}
                      onChange={(e) =>
                        setAtaqueEditando((prev) => ({
                          ...prev,
                          [ataque.id]: {
                            ...prev[ataque.id],
                            praiaId: e.target.value,
                          },
                        }))
                      }
                    >
                      {praias.map((p) => (
                        <option key={p.praiaId} value={p.praiaId}>
                          {p.nome} - {p.cidade}
                        </option>
                      ))}
                    </select>

                    <input
                      type="date"
                      className="border p-2 w-full mb-2"
                      value={ataqueEditando[ataque.id]?.data || ataque.data}
                      onChange={(e) =>
                        setAtaqueEditando((prev) => ({
                          ...prev,
                          [ataque.id]: {
                            ...prev[ataque.id],
                            data: e.target.value,
                          },
                        }))
                      }
                    />

                    <textarea
                      className="border p-2 w-full mb-2"
                      value={ataqueEditando[ataque.id]?.descricao || ataque.descricao}
                      onChange={(e) =>
                        setAtaqueEditando((prev) => ({
                          ...prev,
                          [ataque.id]: {
                            ...prev[ataque.id],
                            descricao: e.target.value,
                          },
                        }))
                      }
                    />

                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                      onClick={() => salvarEdicao(ataque.id)}
                    >
                      Salvar
                    </button>

                    <button
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                      onClick={() => {
                        setEditando(null);
                        setAtaqueEditando((prev) => {
                          const copy = { ...prev };
                          delete copy[ataque.id];
                          return copy;
                        });
                      }}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Praia:</strong>{" "}
                      {praias.find((p) => p.praiaId === ataque.praiaId)?.nome ||
                        "Desconhecida"}{" "}
                      ({ataque.praiaId})
                    </p>
                    <p>
                      <strong>Data:</strong> {ataque.data}
                    </p>
                    <p>
                      <strong>Descrição:</strong> {ataque.descricao}
                    </p>

                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 mt-2"
                      onClick={() => setEditando(ataque.id)}
                    >
                      Editar
                    </button>

                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded mt-2"
                      onClick={() => deletarAtaque(ataque.id)}
                    >
                      Excluir
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
