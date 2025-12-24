"use client";
import React, { useEffect, useRef } from "react";

/**
 * Consulta IA:
 * - Ahora integrada con Botpress v3.5
 * - Carga el widget oficial del Dr. Orlando
 */

export default function ConsultationAI() {
  const rootRef = useRef(null);

  // Reveal on scroll
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-inview");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="consulta-ia"
      className="section ai-consult reveal-fade"
      style={{ paddingTop: "8rem", paddingBottom: "4rem" }}
    >
      <div className="container" style={{ maxWidth: 900 }}>
        <header style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 className="h2" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
            Asistente Virtual
          </h1>
          <p className="lead" style={{ maxWidth: 600, margin: "12px auto 0" }}>
            Nuestro asistente inteligente está listo para responder sus dudas sobre procedimientos y agendamiento.
          </p>
        </header>

        {/* Placeholder para el Bot */}
        <div
          className="surface rounded-xl shadow"
          style={{
            height: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem",
            border: "1px solid var(--divider)",
            background: "rgba(23, 31, 33, 0.6)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <div className="bot-icon-placeholder" style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖</div>
            <h3 className="h3">¡Hola! Soy tu asistente</h3>
            <p className="muted" style={{ marginTop: "0.5rem" }}>
              Haz clic en la burbuja de chat que aparece en la esquina inferior derecha para comenzar a conversar conmigo.
            </p>
          </div>

          <button
            onClick={() => window.toggleN8nChat && window.toggleN8nChat(true)}
            className="btn btn--primary"
            style={{ borderRadius: "999px" }}
          >
            Abrir Chat ahora
          </button>
        </div>
      </div>
    </section>
  );
}
