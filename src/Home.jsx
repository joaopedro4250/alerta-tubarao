// src/Home.jsx
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Header from "./Header";

export default function Home() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showBatherCards, setShowBatherCards] = useState(false);
  const [showSharkCards, setShowSharkCards] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  function abrirMaisInformacoes() {
    setShowMoreInfo(true);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <Header />

      {/* INTRODUÇÃO */}
      <section className="max-w-5xl mx-auto text-center py-12 px-4 bg-[#f5f4ff] rounded-2xl mt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-6">{t("intro.title")}</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">{t("intro.paragraph1")}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          <img src="/tubarao-tigre.jpg" className="w-full md:w-1/2 h-60 object-cover rounded-2xl shadow-lg" />
          <img src="/banhistas-praia.jpg" className="w-full md:w-1/2 h-60 object-cover rounded-2xl shadow-lg" />
        </div>

        <p className="text-gray-700 text-lg">{t("intro.paragraph2")}</p>

        <button
          onClick={abrirMaisInformacoes}
          className="mt-6 bg-[#6A5ACD] text-white px-8 py-3 rounded-xl shadow-lg hover:bg-[#5a49c1] transition"
        >
          {t("home.learnMore")}
        </button>
      </section>

      {/* MINI MAPA */}
      <section className="w-full max-w-5xl mx-auto mt-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#6A5ACD] mb-4">{t("home.realtimeMap")}</h2>
        <div className="w-full h-72 md:h-80 border-2 border-[#6A5ACD] shadow-lg rounded-2xl overflow-hidden">
          <MapContainer
            center={[-8.125, -34.915]}
            zoom={11}
            scrollWheelZoom={false}
            dragging={false}
            doubleClickZoom={false}
            zoomControl={false}
            className="w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-8.125, -34.915]}>
              <Popup>{t("home.monitoredBeaches")}</Popup>
            </Marker>
          </MapContainer>
        </div>

        <Link
          to="/map"
          className="mt-6 inline-block bg-[#6A5ACD] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-[#5a49c1] transition text-lg"
        >
          {t("home.fullMap")}
        </Link>
      </section>

      {/* SEÇÃO FINAL — BANHISTA E TUBARÃO */}
      {showMoreInfo && (
        <section
          ref={sectionRef}
          className={`max-w-5xl mx-auto mt-20 px-4 transition-all duration-700 ${
            showMoreInfo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl md:text-3xl text-center font-bold text-[#6A5ACD] mb-10">
            {t("home.importantInfo")}
          </h2>

          {/* IMAGEM BANHISTA */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div
              className="relative w-72 sm:w-80 md:w-96 h-60 rounded-[30px] overflow-hidden shadow-lg border-4 border-[#6A5ACD] bg-cover"
              style={{ backgroundImage: "url('/praia.jpg')" }}
            >
              <img src="/banhista.png" className="absolute bottom-0 right-4 w-40" />
              <button
                onClick={() => setShowBatherCards(!showBatherCards)}
                className="absolute top-2 left-2 bg-[#6A5ACD] text-white p-2 rounded-full shadow-lg"
              >
                <ChevronDown size={24} />
              </button>
            </div>

            {showBatherCards && (
              <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fadeSlide">
                <div className="bg-[#3AB54A] text-white rounded-2xl p-6 w-72 shadow-lg font-bold hover:scale-105 transition-transform duration-300">
                  {t("bather.tips")}
                </div>
                <div className="bg-[#3AB54A] text-white rounded-2xl p-6 w-72 shadow-lg font-bold hover:scale-105 transition-transform duration-300">
                  {t("bather.equipment")}
                </div>
              </div>
            )}
          </div>

          {/* IMAGEM TUBARÃO */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div
              className="relative w-72 sm:w-80 md:w-96 h-60 rounded-[30px] overflow-hidden shadow-lg border-4 border-[#6A5ACD] bg-cover"
              style={{ backgroundImage: "url('/praia-noite.png')" }}
            >
              <img src="/tubarao.png" className="absolute bottom-0 right-4 w-44" />
              <button
                onClick={() => setShowSharkCards(!showSharkCards)}
                className="absolute top-2 left-2 bg-[#6A5ACD] text-white p-2 rounded-full shadow-lg"
              >
                <ChevronDown size={24} />
              </button>
            </div>

            {showSharkCards && (
              <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fadeSlide">
                <div className="bg-[#FF5C5C] text-white rounded-2xl p-6 w-72 shadow-lg font-bold hover:scale-105 transition-transform duration-300">
                  {t("shark.attacks")}
                </div>
                <div className="bg-[#FF5C5C] text-white rounded-2xl p-6 w-72 shadow-lg font-bold hover:scale-105 transition-transform duration-300">
                  {t("shark.causes")}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-24">
        © 2025 Alerta Tubarão — Todos os direitos reservados
      </footer>
    </div>
  );
}
