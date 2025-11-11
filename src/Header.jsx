import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "./i18n";

export default function Header() {
  const { t } = useTranslation();
  const [showFlags, setShowFlags] = useState(false);

  return (
    <header className="bg-[#6A5ACD] text-white flex items-center justify-between px-8 h-20 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Logo Alerta Tubarão" className="w-54 h-48" />
      </div>

      {/* Menu */}
      <nav className="hidden md:flex space-x-6 font-semibold">
        <a href="/" className="hover:text-gray-200">{t("menu.prevention")}</a>
        <Link to="/map" className="hover:text-gray-200">{t("menu.map")}</Link>
        <a href="#" className="hover:text-gray-200">{t("menu.contact")}</a>
        <a href="#" className="hover:text-gray-200">{t("menu.download")}</a>
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
  );
}
