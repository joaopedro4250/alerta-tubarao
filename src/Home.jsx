// src/Home.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "./i18n";

export default function Home() {
  const [showSharkCards, setShowSharkCards] = useState(false);
  const [showBatherCards, setShowBatherCards] = useState(false);
  const { t } = useTranslation();
  const [showFlags, setShowFlags] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Header */}
      <header className="bg-[#6A5ACD] text-white flex items-center justify-between px-6 md:px-8 h-20 shadow-md relative">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo Alerta Tubarão" className="w-32 md:w-40 h-auto" />
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-6 font-semibold">
          <Link to="/" className="hover:text-gray-200">{t("menu.prevention")}</Link>
          <Link to="/map" className="hover:text-gray-200">{t("menu.map")}</Link>
          <a href="#" className="hover:text-gray-200">{t("menu.contact")}</a>
          <a href="#" className="hover:text-gray-200">{t("menu.download")}</a>
          <Link to="/login" className="hover:text-gray-200">{t("menu.login")}</Link>
          <Link to="/register" className="hover:text-gray-200">{t("menu.register")}</Link>
        </nav>

        {/* Bandeiras e Menu Mobile lado a lado */}
        <div className="flex items-center gap-4">
          {/* Bandeira sempre visível (PC + Celular) */}
          <div className="relative">
            <img
              src={
                i18n.language === "pt"
                  ? "/bandeira-brasil.jpg"
                  : i18n.language === "en"
                  ? "/bandeira-estados-unidos.jpg"
                  : "/bandeira-espanha.png"
              }
              alt="Bandeira atual"
              className="w-9 h-6 rounded-sm border border-white cursor-pointer"
              onClick={() => setShowFlags(!showFlags)}
            />
            {showFlags && (
              <div className="absolute right-0 mt-2 flex flex-col items-center bg-white shadow-lg rounded-md border p-2 z-50">
                {[ 
                  { img: "/bandeira-brasil.jpg", lang: "pt" },
                  { img: "/bandeira-estados-unidos.jpg", lang: "en" },
                  { img: "/bandeira-espanha.png", lang: "es" },
                ].map(({ img, lang }) => (
                  <img
                    key={lang}
                    src={img}
                    alt={lang}
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

          {/* Botão Hamburguer */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden text-white text-3xl"
          >
            ☰
          </button>
        </div>

        {/* Dropdown Mobile */}
        {menuAberto && (
          <div className="absolute top-20 left-0 w-full bg-[#7B68EE] flex flex-col items-center space-y-4 py-6 md:hidden shadow-lg z-50">
            <Link to="/" className="hover:text-gray-200" onClick={() => setMenuAberto(false)}>
              {t("menu.prevention")}
            </Link>
            <Link to="/map" className="hover:text-gray-200" onClick={() => setMenuAberto(false)}>
              {t("menu.map")}
            </Link>
            <a href="#" className="hover:text-gray-200" onClick={() => setMenuAberto(false)}>
              {t("menu.contact")}
            </a>
            <a href="#" className="hover:text-gray-200" onClick={() => setMenuAberto(false)}>
              {t("menu.download")}
            </a>
            <Link to="/login" className="hover:text-gray-200" onClick={() => setMenuAberto(false)}>
              {t("menu.login")}
            </Link>
            <Link to="/register" className="hover:text-gray-200" onClick={() => setMenuAberto(false)}>
              {t("menu.register")}
            </Link>
          </div>
        )}
      </header>

      {/* Introdução */}
      <section className="max-w-5xl mx-auto text-center py-12 px-4 sm:px-6 bg-[#f5f4ff] rounded-2xl mt-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-6">
          {t("intro.title")}
        </h1>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
          {t("intro.paragraph1")}
        </p>

        {/* Imagens */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
          <img
            src="/tubarao-tigre.jpg"
            alt="Tubarão"
            className="w-full md:w-1/2 h-60 sm:h-64 object-cover rounded-2xl shadow-lg"
          />
          <img
            src="/banhistas-praia.jpg"
            alt="Praia de Recife"
            className="w-full md:w-1/2 h-60 sm:h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          {t("intro.paragraph2")}
        </p>
      </section>

      {/* Conteúdo principal */}
      <main className="flex flex-col items-center md:items-end gap-16 p-6 md:p-12 relative mt-10">
        {/* Banhista */}
        <div
          className="relative w-72 sm:w-80 md:w-96 h-60 sm:h-64 md:h-72 rounded-[30px] overflow-hidden shadow-lg bg-cover bg-center border-4 border-[#6A5ACD]"
          style={{ backgroundImage: "url('/praia.jpg')" }}
        >
          <img
            src="/banhista.png"
            alt="Banhista cartoon"
            className="absolute bottom-0 right-4 w-32 sm:w-36 md:w-40 h-auto"
          />
          <button
            onClick={() => setShowBatherCards(!showBatherCards)}
            className="absolute top-2 left-2 bg-[#6A5ACD] text-white px-3 py-1 rounded-full shadow-lg font-bold hover:bg-[#5a49c1]"
          >
            ▶
          </button>
        </div>

        {/* Cards do Banhista */}
        <div
          className={`transition-all duration-500 flex flex-col sm:flex-row gap-4 md:absolute ${
            showBatherCards
              ? "md:translate-x-[-500px] opacity-100"
              : "md:translate-x-0 opacity-0"
          } top-[calc(12rem)] md:right-12`}
        >
          <div className="bg-[#3AB54A] text-white rounded-2xl p-6 sm:p-8 w-72 sm:w-80 md:w-96 font-bold text-sm sm:text-base shadow-lg">
            {t("bather.tips")}
          </div>
          <div className="bg-[#3AB54A] text-white rounded-2xl p-6 sm:p-8 w-72 sm:w-80 md:w-96 font-bold text-sm sm:text-base shadow-lg">
            {t("bather.equipment")}
          </div>
        </div>

        {/* Tubarão */}
        <div
          className="relative w-72 sm:w-80 md:w-96 h-60 sm:h-64 md:h-72 rounded-[30px] overflow-hidden shadow-lg bg-cover bg-center border-4 border-[#6A5ACD]"
          style={{ backgroundImage: "url('/praia-noite.png')" }}
        >
          <img
            src="/tubarao.png"
            alt="Tubarão com prancha"
            className="absolute bottom-0 right-4 w-36 sm:w-40 md:w-44 h-auto"
          />
          <button
            onClick={() => setShowSharkCards(!showSharkCards)}
            className="absolute top-2 left-2 bg-[#6A5ACD] text-white px-3 py-1 rounded-full shadow-lg font-bold hover:bg-[#5a49c1]"
          >
            ▶
          </button>
        </div>

        {/* Cards do Tubarão */}
        <div
          className={`transition-all duration-500 flex flex-col sm:flex-row gap-4 md:absolute ${
            showSharkCards
              ? "md:translate-x-[-500px] opacity-100"
              : "md:translate-x-0 opacity-0"
          } top-[calc(32rem)] md:right-12`}
        >
          <div className="bg-[#FF5C5C] text-white rounded-2xl p-6 sm:p-8 w-72 sm:w-80 md:w-96 font-bold text-sm sm:text-base shadow-lg">
            {t("shark.attacks")}
          </div>
          <div className="bg-[#FF5C5C] text-white rounded-2xl p-6 sm:p-8 w-72 sm:w-80 md:w-96 font-bold text-sm sm:text-base shadow-lg">
            {t("shark.causes")}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-24">
        <p className="text-sm sm:text-base">
          © 2025 Alerta Tubarão — Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
