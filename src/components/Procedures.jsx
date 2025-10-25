"use client";
import React from "react";
import { Link } from "react-router-dom";
import { PROCEDURES } from "../data/procedures"; // tu array con { slug, title, short, image? }
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

/**
 * Procedures page — muestra las tarjetas 3D para cada procedimiento.
 * - Cada tarjeta usa CardContainer / CardBody / CardItem
 * - El footer (cta) está en una capa separada para evitar que el tilt bloquee clicks
 */

export default function Procedures() {
  return (
    <section className="section procs" aria-labelledby="procedimientos-heading">
      <div className="container">
        <header className="procs__head">
          <h2 id="procedimientos-heading" className="h2" style={{ fontSize: "clamp(2rem,4vw,2.75rem)", marginBottom: ".25rem" }}>
            Nuestros Procedimientos
          </h2>
          <p className="procs__sub">
            Descubra cómo podemos ayudarle a alcanzar sus objetivos estéticos. Ofrecemos una amplia
            variedad de procedimientos faciales y corporales, utilizando las técnicas más avanzadas y seguras.
          </p>
        </header>

        <div className="procs__grid" role="list">
          {PROCEDURES.map((p) => (
            <article key={p.slug} className="card" role="listitem" aria-labelledby={`proc-${p.slug}-title`}>
              {/* CardContainer (envuelve el efecto 3D) */}
              <CardContainer
                className="card3d"
                style={{
                  "--card-tilt-max": "5deg",
                  "--card-tilt-duration": "480ms",
                }}
                aria-hidden="false"
              >
                <CardBody className="is-dark" style={{ padding: "1rem", minHeight: "360px", display: "flex", flexDirection: "column" }}>
                  {/* Capa inclinable (contenido visual) */}
                  <div className="td3d-tilt" style={{ flex: "1 1 auto" }}>
                    <CardItem translateZ="26" className="card__media" style={{ borderRadius: "var(--radius-lg)", minHeight: "180px", display: "grid", placeItems: "center", overflow: "hidden" }}>
                      {p.image ? (
                        <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      ) : (
                        <span style={{ color: "var(--acero-urbano)" }}>Input para Imagen</span>
                      )}
                    </CardItem>

                    <CardItem translateZ="18" as="div" className="card__body" style={{ padding: "1rem 0 0 0", display: "flex", flexDirection: "column", gap: ".5rem" }}>
                      <h3 id={`proc-${p.slug}-title`} className="card__title" style={{ margin: 0 }}>{p.title}</h3>
                      <p className="card__text" style={{ margin: 0 }}>{p.short}</p>
                    </CardItem>
                  </div>

                  {/* Footer / CTA — en su propio plano para que siempre sea clickeable */}
                  <div className="td3d-footer" style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end", gap: ".5rem" }}>
                    <Link to={`/procedimiento/${p.slug}`} className="btn btn--ghost" aria-label={`Conocer más sobre ${p.title}`}>
                      Conocer más
                    </Link>
                  </div>
                </CardBody>
              </CardContainer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
