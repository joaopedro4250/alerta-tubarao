// src/Home.jsx
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "./i18n";
import { ChevronDown } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Home() {
  const [showFlags, setShowFlags] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

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

      {/* HEADER */}
      <header className="bg-[#6A5ACD] text-white flex items-center justify-between px-6 md:px-8 h-20 shadow-md relative">

        <img src="/logo.png" className="w-32 md:w-40" />

        <nav className="hidden md:flex space-x-6 font-semibold">
          <Link to="/">{t("menu.prevention")}</Link>
          <Link to="/map">{t("menu.map")}</Link>
          <a href="#">{t("menu.contact")}</a>
          <a href="#">{t("menu.download")}</a>
          <Link to="/login">{t("menu.login")}</Link>
          <Link to="/register">{t("menu.register")}</Link>
        </nav>

        {/* Bandeiras e Menu mobile */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={
                i18n.language === "pt"
                  ? "/bandeira-brasil.jpg"
                  : i18n.language === "en"
                  ? "/bandeira-estados-unidos.jpg"
                  : "/bandeira-espanha.png"
              }
              className="w-9 h-6 rounded-sm border cursor-pointer"
              onClick={() => setShowFlags(!showFlags)}
            />

            {showFlags && (
              <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded-md p-2 flex flex-col z-50">
                {[
                  { img: "/bandeira-brasil.jpg", lang: "pt" },
                  { img: "/bandeira-estados-unidos.jpg", lang: "en" },
                  { img: "/bandeira-espanha.png", lang: "es" }
                ].map(({ img, lang }) => (
                  <img
                    key={lang}
                    src={img}
                    className="w-9 h-6 m-1 cursor-pointer hover:opacity-70"
                    onClick={() => {
                      i18n.changeLanguage(lang);
                      setShowFlags(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setMenuAberto(!menuAberto)} className="md:hidden text-white text-3xl">☰</button>
        </div>

        {menuAberto && (
          <div className="absolute top-20 left-0 w-full bg-[#7B68EE] flex flex-col items-center py-6 space-y-4 shadow-lg md:hidden z-50">
            <Link to="/" onClick={() => setMenuAberto(false)}>{t("menu.prevention")}</Link>
            <Link to="/map" onClick={() => setMenuAberto(false)}>{t("menu.map")}</Link>
            <a href="#" onClick={() => setMenuAberto(false)}>{t("menu.contact")}</a>
            <a href="#" onClick={() => setMenuAberto(false)}>{t("menu.download")}</a>
            <Link to="/login" onClick={() => setMenuAberto(false)}>{t("menu.login")}</Link>
            <Link to="/register" onClick={() => setMenuAberto(false)}>{t("menu.register")}</Link>
          </div>
        )}

      </header>

      {/* INTRODUÇÃO */}
      <section className="max-w-5xl mx-auto text-center py-12 px-4 bg-[#f5f4ff] rounded-2xl mt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-6">{t("intro.title")}</h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-8">{t("intro.paragraph1")}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          <img src="/tubarao-tigre.jpg" className="w-full md:w-1/2 h-60 object-cover rounded-2xl shadow-lg" />
          <img src="/banhistas-praia.jpg" className="w-full md:w-1/2 h-60 object-cover rounded-2xl shadow-lg" />
        </div>

        <p className="text-gray-700 text-lg">{t("intro.paragraph2")}</p>

        {/* botão SAIBA MAIS */}
        <button
          onClick={abrirMaisInformacoes}
          className="mt-6 bg-[#6A5ACD] text-white px-8 py-3 rounded-xl shadow-lg hover:bg-[#5a49c1] transition"
        >
          Saiba mais ↓
        </button>
      </section>

      {/* MINI MAPA */}
      <section className="w-full max-w-5xl mx-auto mt-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#6A5ACD] mb-4">Veja o mapa de risco em tempo real</h2>

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
              <Popup>Praias monitoradas</Popup>
            </Marker>
          </MapContainer>
        </div>

        <Link
          to="/map"
          className="mt-6 inline-block bg-[#6A5ACD] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-[#5a49c1] transition text-lg"
        >
          Acessar mapa completo →
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
            Informações importantes
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
