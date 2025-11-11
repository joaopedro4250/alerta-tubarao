import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; // 👈 Importante para navegação
import i18n from "./i18n";

export default function Home() {
  const [showSharkCards, setShowSharkCards] = useState(false);
  const [showBatherCards, setShowBatherCards] = useState(false);
  const { t } = useTranslation();
  const [showFlags, setShowFlags] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Header */}
      <header className="bg-[#6A5ACD] text-white flex items-center justify-between px-8 h-20 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo Alerta Tubarão" className="w-54 h-48" />
        </div>

        {/* Menu com tradução */}
        <nav className="hidden md:flex space-x-6 font-semibold">
          <a href="#" className="hover:text-gray-200">{t("menu.prevention")}</a>
          <Link to="/map" className="hover:text-gray-200">{t("menu.map")}</Link>
          <a href="#" className="hover:text-gray-200">{t("menu.contact")}</a>
          <a href="#" className="hover:text-gray-200">{t("menu.download")}</a>
          {/* 👇 Ajustes para redirecionar corretamente */}
          <Link to="/login" className="hover:text-gray-200">{t("menu.login")}</Link>
          <Link to="/register" className="hover:text-gray-200">{t("menu.register")}</Link>
        </nav>

        {/* Seleção de idioma */}
        <div className="relative hidden md:block">
          <img
            src={
              i18n.language === "pt"
                ? "/bandeira-brasil.jpg"
                : i18n.language === "en"
                ? "/bandeira-estados-unidos.jpg"
                : "/bandeira-espanha.png"
            }
            alt="Bandeira atual"
            className="w-10 h-7 rounded-sm border border-white cursor-pointer"
            onClick={() => setShowFlags(!showFlags)}
          />

          {showFlags && (
            <div className="absolute right-0 mt-2 flex flex-col bg-white shadow-lg rounded-md border p-2 z-50">
              <img
                src="/bandeira-brasil.jpg"
                alt="Português"
                className="w-10 h-7 m-1 cursor-pointer hover:opacity-70"
                onClick={() => {
                  i18n.changeLanguage("pt");
                  setShowFlags(false);
                }}
              />
              <img
                src="/bandeira-estados-unidos.jpg"
                alt="English"
                className="w-10 h-7 m-1 cursor-pointer hover:opacity-70"
                onClick={() => {
                  i18n.changeLanguage("en");
                  setShowFlags(false);
                }}
              />
              <img
                src="/bandeira-espanha.png"
                alt="Español"
                className="w-10 h-7 m-1 cursor-pointer hover:opacity-70"
                onClick={() => {
                  i18n.changeLanguage("es");
                  setShowFlags(false);
                }}
              />
            </div>
          )}
        </div>

        <button className="md:hidden text-white font-bold text-2xl">☰</button>
      </header>

      {/* Introdução */}
      <section className="max-w-5xl mx-auto text-center py-16 px-6 bg-[#f5f4ff] rounded-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-6">
          {t("intro.title")}
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          {t("intro.paragraph1")}
        </p>

        {/* Imagens */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
          <img
            src="/tubarao-tigre.jpg"
            alt="Tubarão"
            className="w-full md:w-1/2 h-64 object-cover rounded-2xl shadow-lg"
          />
          <img
            src="/banhistas-praia.jpg"
            alt="Praia de Recife"
            className="w-full md:w-1/2 h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <p className="text-gray-700 text-lg leading-relaxed">
          {t("intro.paragraph2")}
        </p>
      </section>

      {/* Conteúdo principal */}
      <main className="flex flex-col items-end gap-16 p-12 relative mt-16">
        {/* Banhista */}
        <div
          className="relative w-80 h-64 md:w-96 md:h-72 rounded-[40px] overflow-hidden shadow-lg bg-cover bg-center border-4 border-[#6A5ACD]"
          style={{ backgroundImage: "url('/praia.jpg')" }}
        >
          <img
            src="/banhista.png"
            alt="Banhista cartoon"
            className="absolute bottom-0 right-6 w-40 h-auto object-contain"
          />
          <button
            onClick={() => setShowBatherCards(!showBatherCards)}
            className="absolute top-2 left-2 z-20 bg-[#6A5ACD] text-white px-3 py-1 rounded-full shadow-lg font-bold hover:bg-[#5a49c1]"
          >
            ▶
          </button>
        </div>

        {/* Cards do Banhista */}
        <div
          className={`absolute top-[calc(12rem)] right-12 flex gap-6 transition-all duration-500 ${
            showBatherCards
              ? "translate-x-[-500px] opacity-100"
              : "translate-x-0 opacity-0"
          }`}
        >
          <div className="bg-[#3AB54A] text-white rounded-2xl p-12 w-80 md:w-96 font-bold text-sm md:text-base shadow-lg">
            {t("bather.tips")}
          </div>
          <div className="bg-[#3AB54A] text-white rounded-2xl p-12 w-80 md:w-96 font-bold text-sm md:text-base shadow-lg">
            {t("bather.equipment")}
          </div>
        </div>

        {/* Tubarão */}
        <div
          className="relative w-80 h-64 md:w-96 md:h-72 rounded-[40px] overflow-hidden shadow-lg bg-cover bg-center border-4 border-[#6A5ACD]"
          style={{ backgroundImage: "url('/praia-noite.png')" }}
        >
          <img
            src="/tubarao.png"
            alt="Tubarão com prancha"
            className="absolute bottom-0 right-6 w-44 h-auto object-contain"
          />
          <button
            onClick={() => setShowSharkCards(!showSharkCards)}
            className="absolute top-2 left-2 z-20 bg-[#6A5ACD] text-white px-3 py-1 rounded-full shadow-lg font-bold hover:bg-[#5a49c1]"
          >
            ▶
          </button>
        </div>

        {/* Cards do Tubarão */}
        <div
          className={`absolute top-[calc(32rem)] right-12 flex gap-6 transition-all duration-500 ${
            showSharkCards
              ? "translate-x-[-500px] opacity-100"
              : "translate-x-0 opacity-0"
          }`}
        >
          <div className="bg-[#FF5C5C] text-white rounded-2xl p-12 w-80 md:w-96 font-bold text-sm md:text-base shadow-lg">
            {t("shark.attacks")}
          </div>
          <div className="bg-[#FF5C5C] text-white rounded-2xl p-12 w-80 md:w-96 font-bold text-sm md:text-base shadow-lg">
            {t("shark.causes")}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#6A5ACD] text-white text-center py-6 mt-24">
        <p className="text-sm md:text-base">
          © 2025 Alerta Tubarão — Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
