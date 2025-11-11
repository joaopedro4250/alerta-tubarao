// src/Header.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "./i18n";

export default function Header() {
  const { t } = useTranslation();
  const [showFlags, setShowFlags] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="bg-[#6A5ACD] text-white flex items-center justify-between px-6 md:px-8 h-20 shadow-md relative z-50">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo Alerta Tubarão"
            className="w-32 md:w-40 h-auto"
          />
        </Link>
      </div>

      {/* Menu Desktop */}
      <nav className="hidden md:flex space-x-6 font-semibold">
        <Link to="/" className="hover:text-gray-200">
          {t("menu.prevention")}
        </Link>
        <Link to="/map" className="hover:text-gray-200">
          {t("menu.map")}
        </Link>
        <a href="#" className="hover:text-gray-200">
          {t("menu.contact")}
        </a>
        <a href="#" className="hover:text-gray-200">
          {t("menu.download")}
        </a>
        <Link to="/login" className="hover:text-gray-200">
          {t("menu.login")}
        </Link>
        <Link to="/register" className="hover:text-gray-200">
          {t("menu.register")}
        </Link>
      </nav>

      {/* Bandeiras + Hamburguer lado a lado */}
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
          <Link
            to="/"
            className="hover:text-gray-200"
            onClick={() => setMenuAberto(false)}
          >
            {t("menu.prevention")}
          </Link>
          <Link
            to="/map"
            className="hover:text-gray-200"
            onClick={() => setMenuAberto(false)}
          >
            {t("menu.map")}
          </Link>
          <a
            href="#"
            className="hover:text-gray-200"
            onClick={() => setMenuAberto(false)}
          >
            {t("menu.contact")}
          </a>
          <a
            href="#"
            className="hover:text-gray-200"
            onClick={() => setMenuAberto(false)}
          >
            {t("menu.download")}
          </a>
          <Link
            to="/login"
            className="hover:text-gray-200"
            onClick={() => setMenuAberto(false)}
          >
            {t("menu.login")}
          </Link>
          <Link
            to="/register"
            className="hover:text-gray-200"
            onClick={() => setMenuAberto(false)}
          >
            {t("menu.register")}
          </Link>
        </div>
      )}
    </header>
  );
}
