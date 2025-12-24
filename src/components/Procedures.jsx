"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROCEDURES } from "../data/procedures";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

// Nuevas imágenes
import Imagenrino from "../img/Rinoplastia_CARD.png";
import ImagenMamas from "../img/AumentodeMamasCard.jpg";
import ImagenLipo from "../img/Liposuccion_Card.png";
import ImagenContorno from "../img/Contorno corporal.png";
import ImagenGluteos from "../img/Gluteos.png";
import ImagenRejuvenecimiento from "../img/Rejuvenecimiento.png";

/** Elige imagen según slug/title si no viene p.image */
function pickImage(p) {
  if (p?.image) return p.image; // respeta la imagen definida en data
  const slug = (p?.slug || "").toLowerCase();
  const title = (p?.title || "").toLowerCase();

  if (slug.includes("rino") || title.includes("rino")) return Imagenrino;
  if (slug.includes("mama") || title.includes("mama")) return ImagenMamas;
  if (slug.includes("lipo") || title.includes("lipo")) return ImagenLipo;
  if (slug.includes("contorno") || title.includes("contorno")) return ImagenContorno;
  if (slug.includes("gluteos") || title.includes("gluteos")) return ImagenGluteos;
  if (slug.includes("rejuvenecimiento") || title.includes("rejuvenecimiento")) return ImagenRejuvenecimiento;

  // Fallback genérico
  return Imagenrino;
}

export default function Procedures() {
  // Trackeo de carga de imágenes para el skeleton
  const [loaded, setLoaded] = useState({}); // { [slug]: true }
  const navigate = useNavigate();

  const goToProcedure = (slug) => {
    if (!slug) return;
    navigate(`/procedimiento/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKeyPressCard = (e, slug) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToProcedure(slug);
    }
  };

  return (
    <section
      className="section procs"
      aria-labelledby="procedimientos-heading"
    >
      <div className="container">
        <header className="procs__head">
          <h1
            id="procedimientos-heading"
            className="h1"
            style={{
              marginBottom: ".50rem",
            }}
          >
            Nuestros Procedimientos
          </h1>
          <p className="procs__sub">
            Descubra cómo puedo ayudarle a alcanzar sus objetivos estéticos.
            Ofrezco una amplia variedad de procedimientos faciales y corporales,
            utilizando las técnicas más avanzadas y seguras.
          </p>
        </header>

        <div className="procs__grid" role="list">
          {PROCEDURES.map((p, idx) => {
            const imgSrc = pickImage(p);
            const slugKey = p.slug || `idx-${idx}`;

            return (
              <article
                key={slugKey}
                className="procs-card"
                role="listitem"
                aria-labelledby={`proc-${slugKey}-title`}
                style={{
                  "--stagger": `${idx * 90}ms`,
                  padding: 0,
                  margin: 0,
                  border: "none",
                  background: "transparent",
                  boxShadow: "none",
                  height: "100%",
                }}
              >
                <CardContainer
                  className="card3d"
                  style={{ height: "100%", cursor: "pointer" }}
                  aria-hidden="false"
                  onClick={() => goToProcedure(p.slug)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyPressCard(e, p.slug)}
                >
                  <CardBody
                    className="is-dark"
                    style={{
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "14px",
                      height: "100%",
                    }}
                  >
                    {/* Capa inclinable (contenido visual) */}
                    <div
                      className="td3d-tilt"
                      style={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardItem
                        translateZ="26"
                        className="card__media procs-media"
                        style={{
                          borderRadius: "var(--radius-lg, 12px)",
                          height: "170px",
                          display: "grid",
                          placeItems: "center",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        {/* Skeleton shimmer mientras carga */}
                        <div
                          className={`procs-skeleton ${loaded[slugKey] ? "is-loaded" : ""
                            }`}
                          aria-hidden
                        />

                        <img
                          src={imgSrc}
                          alt={p.title}
                          className="procs-img"
                          loading="lazy"
                          decoding="async"
                          onLoad={() =>
                            setLoaded((s) => ({ ...s, [slugKey]: true }))
                          }
                          onError={(e) => {
                            if (!e.currentTarget.dataset.fallbacked) {
                              e.currentTarget.dataset.fallbacked = "1";
                              e.currentTarget.src = Imagenrino; // fallback
                              setLoaded((s) => ({ ...s, [slugKey]: true }));
                            }
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transform: "scale(1)",
                            transition:
                              "transform .55s ease, opacity .35s ease",
                            opacity: loaded[slugKey] ? 1 : 0,
                          }}
                        />
                      </CardItem>

                      <CardItem
                        translateZ="18"
                        as="div"
                        className="card__body procs-body"
                        style={{
                          padding: "0.9rem 0 0 0",
                          display: "flex",
                          flexDirection: "column",
                          gap: ".5rem",
                        }}
                      >
                        <h3
                          id={`proc-${slugKey}-title`}
                          className="card__title"
                          style={{ margin: 0 }}
                        >
                          {p.title}
                        </h3>
                        <p className="card__text" style={{ margin: 0 }}>
                          {p.short}
                        </p>
                      </CardItem>
                    </div>

                    {/* Footer / CTA */}
                    <div
                      className="td3d-footer"
                      style={{
                        marginTop: "auto",
                        paddingTop: "1.5rem", // Increased top margin/padding
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: ".5rem",
                      }}
                    >
                      <button
                        type="button"
                        className="procs-cta"
                        aria-label={`Conocer más sobre ${p.title}`}
                        onClick={(e) => {
                          e.stopPropagation(); // evita doble navegación por burbujeo
                          goToProcedure(p.slug);
                        }}
                      >
                        <span className="procs-cta__label">Conocer más</span>
                        <span className="procs-cta__icon" aria-hidden="true">
                          ➜
                        </span>
                        <span className="procs-cta__glow" aria-hidden="true" />
                      </button>
                    </div>
                  </CardBody>
                </CardContainer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
