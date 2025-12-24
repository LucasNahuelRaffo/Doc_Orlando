"use client";
import React, { useEffect, useState } from "react";

/* ====== Iconos creados a mano: mismo estilo, 24x24, stroke redondeado ====== */
function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" {...props}>
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4.5" />
        <line x1="12" y1="2.2" x2="12" y2="5.2" />
        <line x1="12" y1="18.8" x2="12" y2="21.8" />
        <line x1="2.2" y1="12" x2="5.2" y2="12" />
        <line x1="18.8" y1="12" x2="21.8" y2="12" />
        <line x1="4.4" y1="4.4" x2="6.5" y2="6.5" />
        <line x1="17.5" y1="17.5" x2="19.6" y2="19.6" />
        <line x1="4.4" y1="19.6" x2="6.5" y2="17.5" />
        <line x1="17.5" y1="6.5" x2="19.6" y2="4.4" />
      </g>
    </svg>
  );
}

function MoonIcon(props) {
  // Luna “crescent” en el mismo trazo/estética
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" {...props}>
      <path
        d="M20.2 13.1A8.5 8.5 0 0 1 10.9 3.8a7.2 7.2 0 1 0 9.3 9.3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function ThemeToggle({ className = "" }) {
  const getInitial = () => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("theme");
    if (saved) return saved;
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
    window.dispatchEvent(new CustomEvent("themeChange", { detail: { theme } }));
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      aria-label="Cambiar tema"
      title="Cambiar tema"
      onClick={toggle}
      className={`theme-toggle ${className}`}
      data-state={theme} // opcional, por si te sirve para tests
    >
      <span className="icon-stack" aria-hidden>
        <SunIcon className="icon sun" />
        <MoonIcon className="icon moon" />
      </span>
    </button>
  );
}
