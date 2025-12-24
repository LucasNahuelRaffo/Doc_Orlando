"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Imagenrino from "../img/Rinoplastia_CARD.png";
import ImagenMamas from "../img/AumentodeMamasCard.jpg";
import ImagenLipo from "../img/Liposuccion_Card.png";

export default function ThreeDCardDemo() {
  const navigate = useNavigate();

  const goToProcedure = (slug) => {
    navigate(`/procedimiento/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePressStart = (e) => {
    e.currentTarget.classList.add("card--pressed");
  };

  const handlePressEnd = (e) => {
    e.currentTarget.classList.remove("card--pressed");
  };

  const imgStyle = {
    width: "100%",
    height: 220,
    objectFit: "cover",
    display: "block",
    borderRadius: "var(--radius-xl)",
    opacity: 0,
    transition: "opacity .35s ease",
  };

  const onImgLoad = (e) => {
    e.currentTarget.style.opacity = 1;
  };

  return (
    <div className="procs__cards-wrap">
      <div className="procs__cards">
      {/* CARD 1 – RINOPLASTIA */}
      <CardContainer
        className="procs__card"
        onClick={() => goToProcedure("rinoplastia")}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        role="button"
        aria-label="Abrir detalle de Rinoplastia"
      >
        <CardBody
          className="is-dark"
          style={{ padding: "1.25rem", minHeight: "360px" }}
        >
          <CardItem
            translateZ="55"
            className="h3"
            style={{ marginBottom: ".35rem", fontSize: "1.5rem" }}
          >
            Rinoplastia
          </CardItem>

          <CardItem
            as="p"
            translateZ="70"
            className="card__text"
            style={{ maxWidth: "48ch", color: "var(--blanco-perla)" }}
          >
            Mejore la forma y función de su nariz con resultados naturales y
            armónicos.
          </CardItem>

          <CardItem translateZ="0" style={{ marginTop: "1rem" }}>
            <div
              className="card__media"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <img
                src={Imagenrino}
                alt="Rinoplastia - Ecuador Aesthetics"
                className="Imagenes_procediminetos"
                style={imgStyle}
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                onLoad={onImgLoad}
              />
            </div>
          </CardItem>

          <CardItem translateZ="40" className="card__cta">
            <button
              type="button"
              className="btn card__btn btn--accent"
              aria-label="Ver más sobre Rinoplastia"
            >
              <span>Ver más</span>
              <span className="card__btn-icon">›</span>
            </button>
          </CardItem>
        </CardBody>
      </CardContainer>

      {/* CARD 2 – AUMENTO DE MAMAS */}
      <CardContainer
        className="procs__card"
        onClick={() => goToProcedure("aumento-de-mamas")}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        role="button"
        aria-label="Abrir detalle de Aumento de Mamas"
      >
        <CardBody
          className="is-dark"
          style={{ padding: "1.25rem", minHeight: "360px" }}
        >
          <CardItem
            translateZ="55"
            className="h3"
            style={{ marginBottom: ".35rem", fontSize: "1.5rem" }}
          >
            Aumento de Mamas
          </CardItem>

          <CardItem
            as="p"
            translateZ="70"
            className="card__text"
            style={{ maxWidth: "48ch", color: "var(--blanco-perla)" }}
          >
            Logre el volumen y la forma deseada para sus senos con implantes de
            alta calidad.
          </CardItem>

          <CardItem translateZ="0" style={{ marginTop: "1rem" }}>
            <div
              className="card__media"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <img
                src={ImagenMamas}
                alt="Aumento de Mamas - Ecuador Aesthetics"
                className="Imagenes_procediminetos"
                style={imgStyle}
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                onLoad={onImgLoad}
              />
            </div>
          </CardItem>

          <CardItem translateZ="40" className="card__cta">
            <button
              type="button"
              className="btn card__btn btn--accent"
              aria-label="Ver más sobre Aumento de Mamas"
            >
              <span>Ver más</span>
              <span className="card__btn-icon">›</span>
            </button>
          </CardItem>
        </CardBody>
      </CardContainer>

      {/* CARD 3 – LIPOSUCCIÓN */}
      <CardContainer
        className="procs__card"
        onClick={() => goToProcedure("liposuccion")}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        role="button"
        aria-label="Abrir detalle de Liposucción"
      >
        <CardBody
          className="is-dark"
          style={{ padding: "1.25rem", minHeight: "360px" }}
        >
          <CardItem
            translateZ="55"
            className="h3"
            style={{ marginBottom: ".35rem", fontSize: "1.5rem" }}
          >
            Liposucción
          </CardItem>

          <CardItem
            as="p"
            translateZ="70"
            className="card__text"
            style={{ maxWidth: "48ch", color: "var(--blanco-perla)" }}
          >
            Elimine depósitos de grasa localizados y esculpa su figura de manera
            efectiva.
          </CardItem>

          <CardItem translateZ="0" style={{ marginTop: "1rem" }}>
            <div
              className="card__media"
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <img
                src={ImagenLipo}
                alt="Liposucción - Ecuador Aesthetics"
                className="Imagenes_procediminetos"
                style={imgStyle}
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                onLoad={onImgLoad}
              />
            </div>
          </CardItem>

          <CardItem translateZ="40" className="card__cta">
            <button
              type="button"
              className="btn card__btn btn--accent"
              aria-label="Ver más sobre Liposucción"
            >
              <span>Ver más</span>
              <span className="card__btn-icon">›</span>
            </button>
          </CardItem>
        </CardBody>
      </CardContainer>
      </div>
      <div className="procs__dots" aria-hidden="true">
        <span className="procs__dot" />
        <span className="procs__dot is-active" />
        <span className="procs__dot" />
      </div>
    </div>
  );
}
