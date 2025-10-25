"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

/**
 * ThreeDCardDemo.jsx
 * - Cada CardContainer recibe className="card3d" para aplicar estilos estables
 * - onMouseDown/onMouseUp agregan/quitan la clase .card--pressed para un pressed state inmediato
 */

export default function ThreeDCardDemo() {
  const navigate = useNavigate();

  const goToProcedure = (slug) => {
    navigate(`/procedimiento/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePressStart = (e) => {
    // sube la card al pressed state (evita que las pseudo capas se queden)
    const root = e.currentTarget.closest(".card3d");
    if (root) root.classList.add("card--pressed");
  };
  const handlePressEnd = (e) => {
    const root = e.currentTarget.closest(".card3d");
    if (root) root.classList.remove("card--pressed");
  };

  return (
    <div style={{
      display: "grid",
      gap: "1.25rem",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
    }}>
      {/* Card 1: Rinoplastia */}
      <CardContainer className="card3d">
        <CardBody className="is-dark" style={{ padding: "1.25rem", minHeight: "360px" }}>
          <CardItem translateZ="55" className="h3" style={{ marginBottom: ".35rem" }}>
            Rinoplastia
          </CardItem>

          <CardItem as="p" translateZ="70" className="muted" style={{ maxWidth: "48ch" }}>
            Mejore la forma y función de su nariz con resultados naturales y armónicos.
          </CardItem>

          <CardItem translateZ="110" style={{ marginTop: "1rem" }}>
            <div
              className="card__media"
              style={{ borderRadius: "var(--radius-xl)", cursor: "pointer" }}
              onClick={() => goToProcedure("rinoplastia")}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              role="button"
              aria-label="Abrir detalle de Rinoplastia"
            >
              Input para Imagen
            </div>
          </CardItem>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.25rem" }}>
            <CardItem translateZ={25} as="a" href="#procedimientos" className="card__link" onClick={(e) => { e.preventDefault(); goToProcedure("rinoplastia"); }}>
            </CardItem>

            <CardItem
              translateZ={25}
              as="button"
              className="btn btn--ghost"
              onClick={(e) => { e.stopPropagation(); goToProcedure("rinoplastia"); }}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              aria-label="Ver más sobre Rinoplastia"
            >
              Ver más
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>

      {/* Card 2: Aumento de Mamas */}
      <CardContainer className="card3d">
        <CardBody className="is-dark" style={{ padding: "1.25rem", minHeight: "360px" }}>
          <CardItem translateZ="55" className="h3" style={{ marginBottom: ".35rem" }}>
            Aumento de Mamas
          </CardItem>

          <CardItem as="p" translateZ="70" className="muted" style={{ maxWidth: "48ch" }}>
            Logre el volumen y la forma deseada para sus senos con implantes de alta calidad.
          </CardItem>

          <CardItem translateZ="110" style={{ marginTop: "1rem" }}>
            <div
              className="card__media"
              style={{ borderRadius: "var(--radius-xl)", cursor: "pointer" }}
              onClick={() => goToProcedure("aumento-de-mamas")}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              role="button"
              aria-label="Abrir detalle de Aumento de Mamas"
            >
              Input para Imagen
            </div>
          </CardItem>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.25rem" }}>
            <CardItem translateZ={25} as="a" href="#doctor" className="card__link" onClick={(e) => { e.preventDefault(); goToProcedure("aumento-de-mamas"); }}>
            </CardItem>

            <CardItem
              translateZ={25}
              as="button"
              className="btn btn--ghost"
              onClick={(e) => { e.stopPropagation(); goToProcedure("aumento-de-mamas"); }}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              aria-label="Ver más sobre Aumento de Mamas"
            >
              Ver más
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>

      {/* Card 3: Liposucción */}
      <CardContainer className="card3d">
        <CardBody className="is-dark" style={{ padding: "1.25rem", minHeight: "360px" }}>
          <CardItem translateZ="55" className="h3" style={{ marginBottom: ".35rem" }}>
            Liposucción
          </CardItem>

          <CardItem as="p" translateZ="70" className="muted" style={{ maxWidth: "48ch" }}>
            Elimine depósitos de grasa localizados y esculpa su figura de manera efectiva.
          </CardItem>

          <CardItem translateZ="110" style={{ marginTop: "1rem" }}>
            <div
              className="card__media"
              style={{ borderRadius: "var(--radius-xl)", cursor: "pointer" }}
              onClick={() => goToProcedure("liposuccion")}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              role="button"
              aria-label="Abrir detalle de Liposucción"
            >
              Input para Imagen
            </div>
          </CardItem>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.25rem" }}>
            <CardItem translateZ={25} as="a" href="#testimonios" className="card__link" onClick={(e) => { e.preventDefault(); goToProcedure("liposuccion"); }}>
            </CardItem>

            <CardItem
              translateZ={25}
              as="button"
              className="btn btn--ghost"
              onClick={(e) => { e.stopPropagation(); goToProcedure("liposuccion"); }}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              aria-label="Ver más sobre Liposucción"
            >
              Ver más
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
