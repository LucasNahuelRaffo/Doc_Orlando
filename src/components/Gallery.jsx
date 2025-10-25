    "use client";
import React, { useState, useMemo } from "react";

/**
 * Gallery component con filtros.
 * Coloca este archivo en: src/components/Gallery.jsx
 */

const CATEGORIES = [
  "Todos",
  "Rinoplastia",
  "Aumento de Mamas",
  "Liposucción",
  "Lifting Facial",
];

/* Datos de ejemplo — reemplaza src con tus imágenes locales o URLs */
const IMAGES = [
  { id: 1, category: "Rinoplastia", type: "Antes", title: "Rinoplastia - Antes" },
  { id: 2, category: "Rinoplastia", type: "Después", title: "Rinoplastia - Después" },
  { id: 3, category: "Aumento de Mamas", type: "Antes", title: "Aumento - Antes" },
  { id: 4, category: "Aumento de Mamas", type: "Después", title: "Aumento - Después" },
  { id: 5, category: "Liposucción", type: "Antes", title: "Lipo - Antes" },
  { id: 6, category: "Liposucción", type: "Después", title: "Lipo - Después" },
  { id: 7, category: "Lifting Facial", type: "Antes", title: "Lifting - Antes" },
  { id: 8, category: "Lifting Facial", type: "Después", title: "Lifting - Después" },
];

export default function Gallery() {
  const [active, setActive] = useState("Todos");

  const filtered = useMemo(() => {
    if (active === "Todos") return IMAGES;
    return IMAGES.filter((i) => i.category === active);
  }, [active]);

  return (
    <section className="section gallery">
      <div className="container">
        <header className="gallery__head">
          <h2 className="h2" style={{ fontFamily: "var(--font-heading)" }}>
            Galería de Antes y Después
          </h2>
          <p className="muted-2" style={{ marginTop: ".5rem", maxWidth: "72ch" }}>
            Explore los resultados reales de nuestros pacientes. La excelencia y el arte de la cirugía plástica
            se reflejan en cada transformación.
          </p>

          <div className="gallery__filters" role="tablist" aria-label="Filtros de galería">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={[
                  "filter-btn",
                  active === c ? "filter-btn--active" : "",
                ].join(" ")}
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                role="tab"
              >
                {c}
              </button>
            ))}
          </div>
        </header>

        <div className="gallery__grid" aria-live="polite">
          {filtered.map((img) => (
            <article className="gallery__card" key={img.id}>
              <div className="gallery__thumb" aria-hidden>
                {/* Reemplazar con <img src={...} alt="..." /> o <picture> según tus assets */}
                <div className="gallery__placeholder">{img.type === "Antes" ? 'Input para "Antes"' : 'Input para "Después"'}</div>
                <span className="gallery__tag">{img.type}</span>
              </div>

              <div className="gallery__meta">
                <strong style={{ display: "block", marginBottom: ".375rem" }}>{img.title}</strong>
                <small className="muted">{img.category}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
