"use client";
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import logoDark from "../img/Recurso 2.png";
import logoLight from "../img/Recurso 1.png";
import logo2Dark from "../img/Recurso 9.png";
import logo2Light from "../img/Recurso 8.png";

import HoverBorderGradient from "./ui/hover-border-gradient";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const lastScrollYRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const scrollRoot = document.querySelector("[data-scroll-root]") || window;

    const getScrollY = () => {
      if (scrollRoot === window) {
        return window.scrollY || document.documentElement.scrollTop || 0;
      }
      return scrollRoot.scrollTop || 0;
    };

    const handleScroll = () => {
      const currentScrollY = getScrollY();

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Always visible
      setIsVisible(true);
      lastScrollYRef.current = currentScrollY;
    };

    scrollRoot.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollRoot.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getTheme = () =>
      window.localStorage.getItem("theme") ||
      document.documentElement.getAttribute("data-theme") ||
      "dark";

    setTheme(getTheme());

    const handleThemeChange = (e) => {
      const newTheme = e?.detail?.theme || getTheme();
      setTheme(newTheme);
    };

    window.addEventListener("themeChange", handleThemeChange);
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  const currentLogo = theme === "light" ? logoLight : logoDark;
  const currentLogo2 = theme === "light" ? logo2Light : logo2Dark;

  return (
    <header
      className={`navbar-new ${!isVisible ? "navbar-hidden" : "navbar-visible"} ${isScrolled ? "navbar-scrolled" : ""} ${isMenuOpen ? "navbar-menu-open" : ""}`}
    >
      <div className="navbar__wrap navbar__wrap--wide">
        <Link to="/inicio" className="navbar__brand" aria-label="Ir al inicio" onClick={closeMenu}>
          <img src={currentLogo} alt="Ecuador Estetica" className="logo" />
          <img src={currentLogo2} alt="Logo secundario" className="logo2" />
        </Link>

        <button
          type="button"
          className={`navbar__toggle ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__menu ${isMenuOpen ? "is-open" : ""}`} id="navbar-menu">
          <Link to="/inicio" className="navbar__link" onClick={closeMenu}>Inicio</Link>
          <Link to="/procedimientos" className="navbar__link" onClick={closeMenu}>Procedimientos</Link>
          <Link to="/galeria" className="navbar__link" onClick={closeMenu}>Galería</Link>
          <Link to="/consulta-ia" className="navbar__link" onClick={closeMenu}>Consulta IA</Link>
          <Link to="/contacto" className="navbar__link" onClick={closeMenu}>Contacto</Link>

          <div className="navbar__cta">
            <HoverBorderGradient as="a" href="#contacto" className="navbar__cta-btn hbg--light" onClick={closeMenu}>
              Agendar Cita
            </HoverBorderGradient>
          </div>
        </nav>
      </div>

      <button
        type="button"
        className={`navbar__overlay ${isMenuOpen ? "is-visible" : ""}`}
        aria-label="Cerrar menú"
        onClick={closeMenu}
        tabIndex={isMenuOpen ? 0 : -1}
      />
    </header>
  );
}
