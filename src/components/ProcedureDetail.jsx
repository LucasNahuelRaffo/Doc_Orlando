"use client";
import React from "react";
import { useParams } from "react-router-dom";
import { PROCEDURES } from "../data/procedures";

export default function ProcedureDetail() {
  const { slug } = useParams();
  const proc = PROCEDURES.find((p) => p.slug === slug);

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
    <section className="section">
      <div className="container">
        {/* Encabezado */}
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: "1rem" }}>
          <span className="chip">{proc.type}</span>
        </div>
        <h1 className="h2" style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem" }}>
          {proc.title}
        </h1>

        <div className="about__grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
          {/* Columna texto */}
          <div>
            <p className="about__p" style={{ marginBottom: "1rem" }}>{proc.long}</p>

            <h3 className="h3" style={{ marginTop: "1.5rem" }}>Beneficios Clave</h3>
            <ul style={{ lineHeight: 1.9, paddingLeft: "1rem" }}>
              {proc.benefits.map((b) => (
                <li key={b}>✅ {b}</li>
              ))}
            </ul>

            <h3 className="h3" style={{ marginTop: "1.5rem" }}>Riesgos y Consideraciones</h3>
            <p className="about__p">{proc.risks}</p>
          </div>

          {/* Columna imagen + CTA */}
          <aside>
            <div
              className="about__photo"
              style={{ minHeight: 320, marginBottom: "1rem", display: "grid", placeItems: "center" }}
            >
              <span style={{ color: "var(--acero-urbano)" }}>Input para Imagen</span>
            </div>

            <div className="testi" style={{ padding: "1rem" }}>
              <h4 className="h3" style={{ margin: 0, marginBottom: ".5rem" }}>
                ¿Interesado en este procedimiento?
              </h4>
              <p className="muted" style={{ marginBottom: ".75rem" }}>
                Agende una consulta para discutir sus objetivos y resolver sus dudas.
              </p>
              <a className="btn btn--primary" href="#agendar">
                Agendar una Cita
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
