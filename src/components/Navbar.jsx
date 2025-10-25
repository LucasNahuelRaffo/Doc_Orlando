// src/components/Navbar.jsx
"use client";
import React, { useEffect, useState } from "react";
import logoDark from "../img/Recurso 2.png"; // crea/coloca este archivo
import logoLight from "../img/Recurso 1.png"; // crea/coloca este archivo
import HoverBorderGradient from "./ui/hover-border-gradient";
import ThemeToggle from "./ui/ThemeToggle";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [logo, setLogo] = useState(logoDark);

  const location = useLocation(); // para poder detectar cambios de ruta si hace falta

  useEffect(() => {
    // detectar tema inicial al montar
    const initial = (typeof window !== "undefined" && window.localStorage.getItem("theme")) || document.documentElement.getAttribute("data-theme") || "dark";
    setLogo(initial === "light" ? logoLight : logoDark);

    // listener para cambios de tema
    const onTheme = (e) => {
      const newTheme = e?.detail?.theme || document.documentElement.getAttribute("data-theme") || "dark";
      setLogo(newTheme === "light" ? logoLight : logoDark);
    };
    window.addEventListener("themeChange", onTheme);

    return () => {
      window.removeEventListener("themeChange", onTheme);
    };
  }, []);

  useEffect(() => {
    const THRESHOLD = 10;
    const HIDE_OFFSET = 120;

    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 8);

      if (Math.abs(y - lastY) <= THRESHOLD) return;
      if (y > lastY && y > HIDE_OFFSET) setHidden(true);
      else setHidden(false);
      setLastY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <header
      className={[
        "navbar",
        hidden ? "navbar--hidden" : "navbar--visible",
        scrolled ? "navbar--scrolled" : "",
      ].join(" ")}
    >
      <div className="container navbar__wrap navbar__wrap--wide">
        <div className="navbar__brand">
          <img src={logo} alt="logo" className="logo" />
          <h4>Ecuador Estetica</h4>
        </div>

        <nav className="navbar__menu">
          <Link to="/inicio" className="navbar__link">Inicio</Link>
          <Link to="/procedimientos" className="navbar__link">Procedimientos</Link>
          <Link to="/galeria" className="navbar__link">Galería</Link>
          <Link to="/consulta-ia" className="navbar__link">Consulta IA</Link>
          <Link to="/contacto" className="navbar__link">Contacto</Link>

          <ThemeToggle className="navbar__toggle" />

          <div className="navbar__cta">
            <HoverBorderGradient as="a" href="/contacto">
              Agendar Cita
            </HoverBorderGradient>
          </div>
        </nav>
      </div>
    </header>
  );
}
