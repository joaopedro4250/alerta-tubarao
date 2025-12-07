// src/MapPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "./Header";
import { useTranslation } from "react-i18next";

// Corrige problema de ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;

const icones = {
  alto: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  medio: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  baixo: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
};

function FlyToPraia({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 14, { duration: 2 });
  }
  return null;
}

export default function MapPage() {
  const { t } = useTranslation();
  const [praias, setPraias] = useState([]);
  const [ataques, setAtaques] = useState([]);
  const [busca, setBusca] = useState("");
  const [praiaSelecionada, setPraiaSelecionada] = useState(null);
  const popupRefs = useRef({});
  const [sugestoes, setSugestoes] = useState([]);

  // ================================
  // CARREGAR PRAIAS
  // ================================
  useEffect(() => {
    async function carregarPraias() {
      try {
        const res = await fetch(
          "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/getPraias"
        );
        const data = await res.json();

        const tratadas = data.praias
          .map((p) => {
            const lat = Number(p.lat);
            const lng = Number(p.lng);
            return {
              praiaId: p.praiaId,
              ...p,
              posicao: [lat, lng],
              descricao: p.descricao || t("map.noDescription"),
            };
          })
          .filter((p) => !p.posicao.includes(NaN));

        setPraias(tratadas);
      } catch (err) {
        console.error("Erro ao carregar praias:", err);
      }
    }

    carregarPraias();
  }, [t]);

  // ================================
  // CARREGAR ATAQUES
  // ================================
  useEffect(() => {
    async function carregarAtaques() {
      try {
        const res = await fetch(
          "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com/getAtaques"
        );
        const data = await res.json();
        setAtaques(data.ataques || []);
      } catch (err) {
        console.error("Erro ao carregar ataques:", err);
      }
    }

    carregarAtaques();
  }, []);

  // ================================
  // FUNÇÃO DE RISCO POR QUANTIDADE DE ATAQUES
  // ================================
  const riscoPorAtaques = (praiaId) => {
    const count = ataques.filter((a) => a.praiaId === praiaId).length;
    if (count <= 3) return "baixo"; // verde
    if (count <= 9) return "medio"; // amarelo
    return "alto"; // vermelho
  };

  // ================================
  // BUSCA
  // ================================
  const handleBuscar = (nomePraia) => {
    const resultado = praias.find(
      (p) => p.nome.toLowerCase() === nomePraia.toLowerCase()
    );
    if (resultado) {
      setPraiaSelecionada(resultado);
      setBusca(resultado.nome);
      setSugestoes([]);

      setTimeout(() => {
        const popup = popupRefs.current[resultado.nome];
        if (popup) popup.openOn(popup._map);
      }, 500);
    } else {
      alert(t("map.beachNotFound"));
    }
  };

  const handleChange = (valor) => {
    setBusca(valor);
    if (valor.length > 0) {
      const filtradas = praias.filter((p) =>
        p.nome.toLowerCase().includes(valor.toLowerCase())
      );
      setSugestoes(filtradas);
    } else {
      setSugestoes([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex flex-col md:flex-row bg-[#f9fafb]">
        {/* MAPA */}
        <div className="flex-1 p-4 md:p-6">
          <div className="w-full h-80 sm:h-[28rem] md:h-[640px] rounded-2xl overflow-hidden shadow-lg relative z-0">
            <MapContainer
              center={[-8.087, -34.905]}
              zoom={12}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              {praiaSelecionada && <FlyToPraia position={praiaSelecionada.posicao} />}
              {praias.map((praia) => (
                <Marker
                  key={praia.nome}
                  position={praia.posicao}
                  icon={icones[riscoPorAtaques(praia.praiaId)]}
                  ref={(ref) => (popupRefs.current[praia.nome] = ref)}
                >
                  <Popup autoClose={false}>
                    <strong>{praia.nome}</strong> <br />
                    <span
                      className={`capitalize ${
                        riscoPorAtaques(praia.praiaId) === "alto"
                          ? "text-red-600"
                          : riscoPorAtaques(praia.praiaId) === "medio"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {t(`map.risk.${riscoPorAtaques(praia.praiaId)}`)}
                    </span>
                    <br />
                    {praia.descricao}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* PAINEL DIREITO */}
        <aside className="w-full md:w-80 bg-[#f0e9ff] p-6 shadow-inner flex flex-col items-center justify-between mt-6 md:mt-0 relative z-10">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              {t("map.searchBeach")}
            </h2>

            <div className="w-full relative">
              <input
                type="text"
                placeholder={t("map.placeholder")}
                value={busca}
                onChange={(e) => handleChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
              <button
                onClick={() => handleBuscar(busca)}
                className="mt-3 w-full bg-[#6A5ACD] text-white py-2 rounded-lg"
              >
                {t("map.searchButton")}
              </button>

              {sugestoes.length > 0 && (
                <ul className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg w-full max-h-48 overflow-y-auto z-50">
                  {sugestoes.map((praia) => (
                    <li
                      key={praia.nome}
                      onClick={() => handleBuscar(praia.nome)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {praia.nome}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {praiaSelecionada && (
              <div className="mt-6 bg-white p-4 rounded-lg shadow w-full text-center">
                <h3 className="font-bold text-[#6A5ACD]">{praiaSelecionada.nome}</h3>
                <p className="text-gray-600 mt-2">{praiaSelecionada.descricao}</p>
                <p className="text-sm text-gray-500 mt-1">
                  ID: {praiaSelecionada.praiaId}
                </p>
              </div>
            )}
          </div>

          {/* Legenda */}
          <div className="mt-8 bg-white p-4 rounded-lg shadow text-center w-full">
            <h4 className="font-semibold text-gray-800 mb-2">{t("map.riskLegend")}</h4>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>{t("map.highRisk")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span>{t("map.mediumRisk")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>{t("map.lowRisk")}</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-8">
        <p>{t("footer")}</p>
      </footer>
    </div>
  );
}
