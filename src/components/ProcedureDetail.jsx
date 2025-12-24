"use client";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { PROCEDURES } from "../data/procedures";

export default function ProcedureDetail() {
  const { slug } = useParams();
  const proc = PROCEDURES.find((p) => p.slug === slug);
  const rootRef = useRef(null);

  // IntersectionObserver para revelar elementos con [data-reveal]
  useEffect(() => {
    if (!rootRef.current) return;
    const nodes = Array.from(rootRef.current.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const delay = e.target.getAttribute("data-delay") || "0ms";
            e.target.style.setProperty("--d", delay);
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  if (!proc) {
    return (
      <section className="section">
        <div className="container">
          <p>No encontramos este procedimiento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section proc-detail" ref={rootRef}>
      <div className="container">
        {/* Encabezado */}
        <div
          style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: "1rem" }}
          className="reveal reveal-pop"
          data-reveal
        >
          <span className="chip">{proc.type}</span>
        </div>

        <h1
          className="h2 reveal reveal-up"
          data-reveal
          data-delay="60ms"
          style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem" }}
        >
          {proc.title}
        </h1>

        <div className="about__grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
          {/* Columna texto */}
          <div>
            <p
              className="about__p reveal reveal-fade"
              data-reveal
              data-delay="110ms"
              style={{ marginBottom: "1rem" }}
            >
              {proc.long}
            </p>

            <h3 className="h3 reveal reveal-up" data-reveal data-delay="150ms" style={{ marginTop: "1.5rem" }}>
              Beneficios Clave
            </h3>
            <ul style={{ lineHeight: 1.9, paddingLeft: "1rem" }}>
              {proc.benefits.map((b, i) => (
                <li
                  key={b}
                  className="reveal reveal-up"
                  data-reveal
                  data-delay={`${200 + i * 70}ms`}
                  style={{ listStyle: "none" }}
                >
                  ✅ {b}
                </li>
              ))}
            </ul>

            <h3 className="h3 reveal reveal-up" data-reveal data-delay="200ms" style={{ marginTop: "1.5rem" }}>
              Riesgos y Consideraciones
            </h3>
            <p className="about__p reveal reveal-fade" data-reveal data-delay="240ms">
              {proc.risks}
            </p>
          </div>

          {/* Columna imagen + CTA */}
          <aside>
            <div
              className="about__photo reveal reveal-zoom"
              data-reveal
              data-delay="160ms"
              style={{
                minHeight: 320,
                marginBottom: "3rem", // Increased bottom margin
                display: "grid",
                placeItems: "center",
                overflow: "hidden",
                borderRadius: 12,
                position: "relative",
              }}
            >
              <span style={{ color: "var(--acero-urbano)" }}>Input para Imagen</span>
              {/* Glow suave al pasar el mouse */}
              <span className="soft-glow" aria-hidden />
            </div>

            <div className="testi reveal reveal-up" data-reveal data-delay="220ms" style={{ padding: "1rem" }}>
              <h4 className="h3" style={{ margin: 0, marginBottom: ".5rem" }}>
                ¿Interesado en este procedimiento?
              </h4>
              <p className="muted" style={{ marginBottom: ".75rem" }}>
                Agende una consulta para discutir sus objetivos y resol
                sus dudas.
              </p>
              <a className="btn btn--primary" href="#contacto">
                Agendar una Cita
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
