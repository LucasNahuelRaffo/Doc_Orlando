// src/components/ui/ThemeToggle.jsx
"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }) {
  // lee tema inicial (si existe) o usa 'dark' por defecto
  const getInitial = () => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("theme");
    if (saved) return saved;
    // opcional: detectar preferencia del sistema
    const pref = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    return pref ? "light" : "dark";
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    // aplica al documento y guarda
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);

    // despacha evento para que otros componentes (ej. Navbar) reaccionen
    window.dispatchEvent(new CustomEvent("themeChange", { detail: { theme } }));
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      aria-label="Toggle theme"
      title="Cambiar tema"
      onClick={toggle}
      className={`theme-toggle ${theme === "light" ? "is-light" : ""} ${className}`}
    >
      <span className="icon sun" aria-hidden>☀️</span>
      <span className="icon moon" aria-hidden>🌙</span>
    </button>
  );
}
