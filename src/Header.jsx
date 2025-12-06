import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import i18n from "./i18n";

export default function Header() {
  const { t } = useTranslation();
  const [showFlags, setShowFlags] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [avatarAberto, setAvatarAberto] = useState(false);

  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.email);
        setIsAdmin(decoded.role === "admin");
      } catch (error) {
        console.log("Token inválido");
      }
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUserEmail(null);
    setIsAdmin(false);
    navigate("/login");
  }

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
        <Link to="/" className="hover:text-gray-200">{t("menu.prevention")}</Link>
        <Link to="/map" className="hover:text-gray-200">{t("menu.map")}</Link>
        <a href="#" className="hover:text-gray-200">{t("menu.contact")}</a>
        <a href="#" className="hover:text-gray-200">{t("menu.download")}</a>
        {isAdmin && (
          <Link
            to="/admin"
            className="hover:text-yellow-300 font-bold border-b-2 border-transparent hover:border-yellow-300"
          >
            Painel ADM
          </Link>
        )}
        {!userEmail && (
          <>
            <Link to="/login" className="hover:text-gray-200">{t("menu.login")}</Link>
            <Link to="/register" className="hover:text-gray-200">{t("menu.register")}</Link>
          </>
        )}
      </nav>

      {/* Bandeiras + Avatar + Hamburguer */}
      <div className="flex items-center gap-4">

        {/* Bandeiras */}
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
            onClick={(e) => { e.stopPropagation(); setShowFlags(!showFlags); }}
          />
          {showFlags && (
            <div className="absolute right-0 mt-2 flex flex-col items-center bg-white shadow-lg rounded-md border p-2 z-50">
              {[{ img: "/bandeira-brasil.jpg", lang: "pt" },
                { img: "/bandeira-estados-unidos.jpg", lang: "en" },
                { img: "/bandeira-espanha.png", lang: "es" }].map(({ img, lang }) => (
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

        {/* Avatar se logado */}
        {userEmail && (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://ui-avatars.com/api/?name=${userEmail}&background=6A5ACD&color=fff`}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
              onClick={() => setAvatarAberto((prev) => !prev)}
            />
            {avatarAberto && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg p-3 w-40 z-50">
                <p className="text-sm font-semibold truncate">{userEmail}</p>
                {isAdmin && (
                  <button
                    className="mt-2 w-full bg-yellow-500 text-white py-1 rounded-md hover:bg-yellow-600"
                    onClick={() => navigate("/admin")}
                  >
                    Painel ADM
                  </button>
                )}
                <button
                  className="mt-2 w-full bg-red-500 text-white py-1 rounded-md hover:bg-red-600"
                  onClick={logout}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hamburguer */}
        <button
          onClick={(e) => { e.stopPropagation(); setMenuMobileAberto((prev) => !prev); }}
          className="md:hidden text-white text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Dropdown Mobile */}
      {menuMobileAberto && (
        <div
          className="absolute top-20 left-0 w-full bg-[#7B68EE] flex flex-col items-center space-y-4 py-6 md:hidden shadow-lg z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to="/" className="hover:text-gray-200" onClick={() => setMenuMobileAberto(false)}>
            {t("menu.prevention")}
          </Link>
          <Link to="/map" className="hover:text-gray-200" onClick={() => setMenuMobileAberto(false)}>
            {t("menu.map")}
          </Link>
          <a href="#" className="hover:text-gray-200" onClick={() => setMenuMobileAberto(false)}>
            {t("menu.contact")}
          </a>
          <a href="#" className="hover:text-gray-200" onClick={() => setMenuMobileAberto(false)}>
            {t("menu.download")}
          </a>
          {isAdmin && (
            <Link
              to="/admin"
              className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold"
              onClick={() => setMenuMobileAberto(false)}
            >
              Painel ADM
            </Link>
          )}
          {!userEmail && (
            <>
              <Link to="/login" className="hover:text-gray-200" onClick={() => setMenuMobileAberto(false)}>
                {t("menu.login")}
              </Link>
              <Link to="/register" className="hover:text-gray-200" onClick={() => setMenuMobileAberto(false)}>
                {t("menu.register")}
              </Link>
            </>
          )}
          {userEmail && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={logout}
            >
              Sair
            </button>
          )}
        </div>
      )}
    </header>
  );
}
