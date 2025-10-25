"use client";
import React from "react";
import HoverBorderGradient from "./ui/hover-border-gradient";
import video from "../img/Video-explicativo.mp4";

export default function Hero() {
  return (
    <section id="inicio" className="section hero">
      <div className="container hero__grid">
        
        {/* BLOQUE DE TEXTO CON BORDE ANIMADO */}
        <div className="hero__content">
          <h1 className="h1 hero__title">
            Cirugía plástica facial con <br /> precisión y criterio estético
          </h1>

          <p className="lead hero__sub">
            Ciencia + arte, trato humano y resultados naturales. Quito, Ecuador.
          </p>

          <div
            className="hero__actions"
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
          >
            <HoverBorderGradient as="a" href="/contacto" className="hbg--slow">
              Agenda tu consulta
            </HoverBorderGradient>

            <HoverBorderGradient
              as="a"
              href="#testimonios"
              className="hbg--light"
            >
              Ver testimonios
            </HoverBorderGradient>
          </div>

          <div className="hero__chips chips">
            <span className="chip">Rinoplastia</span>
            <span className="chip">Aumento de Mamas</span>
            <span className="chip">Liposucción</span>
            <span className="chip">Lifting Facial</span>
          </div>
        </div>

        {/* VIDEO EXPLICATIVO */}
        <aside className="hero__media">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="hero__video"
          />
        </aside>
      </div>
    </section>
  );
}
