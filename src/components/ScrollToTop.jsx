"use client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * - Llama window.scrollTo cada vez que cambia la ruta (pathname).
 * - Por defecto usa comportamiento "smooth" (puedes cambiar a "auto" si prefieres instantáneo).
 */
export default function ScrollToTop({ behavior = "smooth" }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Aseguramos también que el foco vaya al body (mejora accesibilidad)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior });
      // opcional: mover foco al main para lecturas de screenreaders
      const main = document.querySelector("main");
      if (main) main.focus({ preventScroll: true });
    }
  }, [pathname, behavior]);

  return null;
}
