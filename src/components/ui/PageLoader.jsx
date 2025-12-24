"use client";
import React, { useEffect, useState } from "react";

export default function PageLoader({ minDelay = 700, children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    let alive = true;

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const whenFonts =
      typeof document !== "undefined" && document.fonts
        ? document.fonts.ready.catch(() => {})
        : Promise.resolve();
    const whenIdle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? new Promise((res) => requestIdleCallback(() => res()))
        : wait(200);

    Promise.all([wait(minDelay), whenFonts, whenIdle]).then(() => {
      if (!alive) return;
      document.documentElement.classList.add("app-ready");
      document.documentElement.classList.remove("no-scroll");
      setReady(true);
    });

    return () => {
      alive = false;
      document.documentElement.classList.remove("no-scroll");
    };
  }, [minDelay]);

  return (
    <>
      {/* Overlay (queda en el DOM y se desvanece; no bloquea eventos al terminar) */}
      <div className={`loader-overlay ${ready ? "is-done" : ""}`} role="status" aria-live="polite">
        <div className="loader-box">
          <div className="loader-spinner" aria-hidden />
          <div className="loader-title">Ecuador Aesthetics</div>
          <div className="loader-sub">Preparando la experiencia…</div>
        </div>
      </div>

      {/* Contenido con fade-in */}
      <div className={`loader-content ${ready ? "is-shown" : ""}`}>
        {children}
      </div>
    </>
  );
}
