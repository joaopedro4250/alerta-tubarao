// src/MapPage.jsx
import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { praias } from "./data/praias";
import { useTranslation } from "react-i18next";
import Header from "./Header"; // ✅ Import do header reutilizável

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
  médio: new L.Icon({
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
  const [busca, setBusca] = useState("");
  const [praiaSelecionada, setPraiaSelecionada] = useState(null);
  const popupRefs = useRef({});
  const [sugestoes, setSugestoes] = useState([]);

  const handleBuscar = (nomePraia) => {
    const resultado = praias.find(
      (p) => p.nome.toLowerCase() === nomePraia.toLowerCase()
    );
    if (resultado) {
      setPraiaSelecionada(resultado);
      setBusca(resultado.nome);
      setSugestoes([]);
      setTimeout(() => {
        const popup = popupRefs.current[resultado.id];
        if (popup) popup.openOn(popup._map);
      }, 500);
    } else {
      alert("Praia não encontrada!");
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
      {/* ✅ Cabeçalho reutilizado */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-grow flex flex-row bg-[#f9fafb]">
        {/* Mapa à esquerda */}
        <div className="flex-1 p-6">
          <div className="w-full h-[640px] rounded-2xl overflow-hidden shadow-lg">
            <MapContainer
              center={[-8.087, -34.905]}
              zoom={12}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              {praiaSelecionada && (
                <FlyToPraia position={praiaSelecionada.posicao} />
              )}

              {praias.map((praia) => (
                <Marker
                  key={praia.id}
                  position={praia.posicao}
                  icon={icones[praia.risco]}
                  ref={(ref) => (popupRefs.current[praia.id] = ref)}
                >
                  <Popup autoClose={false}>
                    <strong>{praia.nome}</strong> <br />
                    <span
                      className={`capitalize ${
                        praia.risco === "alto"
                          ? "text-red-600"
                          : praia.risco === "médio"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      Risco: {praia.risco}
                    </span>
                    <br />
                    {praia.descricao}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Painel lateral direito */}
        <aside className="w-80 bg-[#f0e9ff] p-6 shadow-inner flex flex-col items-center justify-between">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Buscar praia
            </h2>

            <div className="w-full relative">
              <input
                type="text"
                placeholder="Digite o nome da praia..."
                value={busca}
                onChange={(e) => handleChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#6A5ACD] outline-none"
              />
              <button
                onClick={() => handleBuscar(busca)}
                className="mt-3 w-full bg-[#6A5ACD] text-white py-2 rounded-lg hover:bg-[#5b4db8] transition"
              >
                Buscar
              </button>

              {sugestoes.length > 0 && (
                <ul className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-full max-h-48 overflow-y-auto z-50">
                  {sugestoes.map((praia) => (
                    <li
                      key={praia.id}
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
                <h3 className="font-bold text-[#6A5ACD]">
                  {praiaSelecionada.nome}
                </h3>
                <p className="text-gray-600 mt-2">
                  {praiaSelecionada.descricao}
                </p>
              </div>
            )}
          </div>

          {/* Legenda centralizada */}
          <div className="mt-8 bg-white p-4 rounded-lg shadow text-center w-full flex flex-col items-center justify-center">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
              🦈 Legenda de Risco
            </h4>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Alto risco</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span>Médio risco</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Baixo risco</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-8">
        <p>© 2025 Alerta Tubarão — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
