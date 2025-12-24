"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import rino1 from "../img/Rino Antes.jpg";
import rino2 from "../img/Rino Despues.jpg";
import mamas from "../img/Mamas.jpg";
import lipo1 from "../img/Lipo_Antes.jpg";
import lipo2 from "../img/Lipo_despues.jpg";
import gluteos from "../img/Gluteos.png";
import contorno1 from "../img/Contorno Corporal Antes.jpg";
import contorno2 from "../img/Contorno corporal Despues.jpg";
import rejuve1 from "../img/Rejuvenesimiento Antes.jpeg";
import rejuve2 from "../img/Rejuvenesimiento Despues.jpg";

const CATEGORIES = [
  "Todos",
  "Rinoplastia",
  "Aumento de Mamas",
  "Liposucción",
  "Aumento de Glúteos",
  "Contorno Corporal",
  "Rejuvenecimiento Facial",
];

// Una tarjeta por procedimiento (cada una con before/after)
const CASES = [
  {
    id: "rino-1",
    category: "Rinoplastia",
    title: "Rinoplastia",
    subtitle: "Armonización facial que resalta tu belleza natural con resultados sutiles y elegantes.",
    before: rino1,
    after: rino2,
    imgStyle: { objectPosition: "center 35%" },
  },
  {
    id: "mamas-1",
    category: "Aumento de Mamas",
    title: "Aumento de Mamas",
    subtitle: "Realce estético que mejora la silueta y la confianza, con proporciones ideales.",
    before: mamas,
    after: mamas,
    imgStyle: { objectPosition: "center center", objectFit: "cover" },
  },
  {
    id: "lipo-1",
    category: "Liposucción",
    title: "Liposucción",
    subtitle: "Esculpido corporal de alta definición para definir curvas y eliminar lo que no necesitas.",
    before: lipo1,
    after: lipo2,
    imgStyle: { objectPosition: "center center", objectFit: "cover" },
  },
  {
    id: "gluteos-1",
    category: "Aumento de Glúteos",
    title: "Aumento de Glúteos",
    subtitle: "Volumen y proyección natural para un perfil más armónico y sensual.",
    before: gluteos,
    after: gluteos,
    imgStyle: { objectPosition: "center center", objectFit: "cover" },
  },
  {
    id: "contorno-1",
    category: "Contorno Corporal",
    title: "Contorno Corporal",
    subtitle: "Redefinición completa de la silueta para lograr un balance estético perfecto.",
    before: contorno1,
    after: contorno2,
    imgStyle: { objectPosition: "center center", objectFit: "cover" },
  },
  {
    id: "lifting-1",
    category: "Rejuvenecimiento Facial",
    title: "Rejuvenecimiento Facial",
    subtitle: "Rejuvenecimiento profundo que restaura la frescura y vitalidad de tu rostro.",
    before: rejuve1,
    after: rejuve2,
    imgStyle: { objectPosition: "center center", objectFit: "cover" },
  },
];

export default function Gallery() {
  const [active, setActive] = useState("Todos");
  const [hoveredId, setHoveredId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const rootRef = useRef(null);

  const filtered = useMemo(() => {
    if (active === "Todos") return CASES;
    return CASES.filter((c) => c.category === active);
  }, [active]);

  // Montaje: animación de cabecera
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const t = setTimeout(() => root.classList.add("ga-mounted"), 20);
    return () => clearTimeout(t);
  }, []);

  // Reveal on scroll para cada tarjeta (y re-observa al cambiar filtro)
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const cards = Array.from(root.querySelectorAll(".gallery__card"));

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-inview");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    cards.forEach((c) => {
      c.classList.remove("is-inview");
      io.observe(c);
    });

    return () => io.disconnect();
  }, [active]);

  return (
    <section ref={rootRef} className="section gallery">
      <div className="container">
        <header className="gallery__head ga-head">
          <h1 className="h1" style={{ fontFamily: "var(--font-heading)" }}>
            Galería de Antes y Después
          </h1>
          <p className="muted-2" style={{ marginTop: ".5rem", maxWidth: "72ch", marginLeft: "22%" }}>
            Pase el cursor para ver el "Después". En móvil, toque la tarjeta.
          </p>

          <div className="gallery__filters ga-filters" role="tablist" aria-label="Filtros de galería">
            {CATEGORIES.map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  className={["filter-btn", "ga-filter", isActive ? "filter-btn--active" : ""].join(" ")}
                  onClick={() => setActive(c)}
                  role="tab"
                  aria-selected={isActive}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </header>

        <div className="gallery__grid ga-grid" aria-live="polite">
          {filtered.map((item, i) => {
            const showAfter = hoveredId === item.id || focusedId === item.id;

            return (
              <article
                className="gallery__card ga-card"
                key={item.id}
                style={{ "--ga-delay": `${i * 90}ms` }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="gallery__thumb" aria-hidden>
                  <button
                    type="button"
                    className="gallery__thumb-btn"
                    onFocus={() => setFocusedId(item.id)}
                    onBlur={() => setFocusedId(null)}
                    onClick={() =>
                      setFocusedId((prev) => (prev === item.id ? null : item.id))
                    }
                    aria-label={`Ver ${showAfter ? "Antes" : "Después"} de ${item.title}`}
                  >
                    {/* STACK con cross-fade suave */}
                    <div className="ga-stack">
                      <img
                        src={item.before}
                        alt={`${item.title} - Antes`}
                        className="ga-img ga-img--before"
                        loading="lazy"
                        decoding="async"
                        style={item.imgStyle}
                      />
                      <img
                        src={item.after}
                        alt={`${item.title} - Después`}
                        className={`ga-img ga-img--after ${showAfter ? "is-on" : ""}`}
                        loading="lazy"
                        decoding="async"
                        style={item.imgStyle}
                      />
                    </div>

                    <span className="gallery__tag ga-tag">
                      {showAfter ? "Después" : "Antes"}
                    </span>
                  </button>
                </div>

                <div className="gallery__meta">
                  <strong style={{ display: "block", marginBottom: ".375rem" }}>
                    {item.title}
                  </strong>
                  <p style={{ color: "var(--blanco-perla)", margin: 0, fontSize: "0.9rem", opacity: 0.9 }}>
                    {item.subtitle}
                  </p>
                  <small className="muted" style={{ display: "block", marginTop: ".25rem" }}>{item.category}</small>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}