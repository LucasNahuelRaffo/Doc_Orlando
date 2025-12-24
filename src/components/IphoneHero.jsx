// src/components/IphoneHero.jsx
"use client";
import React from "react";
import HoverBorderGradient from "./ui/hover-border-gradient";

// Cambiá estos imports por tus fotos reales (colócalas en src/img/)
import doc1 from "../img/Recurso 1.png";
import doc2 from "../img/Recurso 1.png";
import doc3 from "../img/Recurso 1.png";

export default function IphoneHero() {
  const team = [
    {
      img: doc1,
      name: "Dr. Elara Vance",
      role: "Facial & Reconstructive Surgery",
      blurb:
        "Cirujana plástica doblemente certificada con más de 15 años de experiencia, especializada en rostro y reconstrucción.",
    },
    {
      img: doc2,
      name: "Dr. Julian Hayes",
      role: "Body Contouring & Breast Surgery",
      blurb:
        "Experto en contorno corporal. Combina precisión quirúrgica con un criterio estético que realza resultados naturales.",
    },
    {
      img: doc3,
      name: "Dr. Kenji Tanaka",
      role: "Minimally Invasive Aesthetics",
      blurb:
        "Referente en técnicas mínimamente invasivas y no quirúrgicas. Enfoque en recuperación rápida y resultados duraderos.",
    },
  ];

  return (
    <section id="iphonehero" className="experts section" aria-label="Equipo médico">
      <div className="container">
        {/* Pill / cartel superior */}
        <div className="experts__pill">Todo lo que quieres lo tienes en nuestros servicios</div>

        {/* Título & subtítulo (igual a la estética del ejemplo) */}
        <h2 className="experts__title">World-Class Surgeons</h2>
        <p className="experts__sub">
          Nuestro equipo de cirujanos plásticos certificados combina décadas de experiencia con una pasión por la excelencia estética.
        </p>

        {/* Grid de 3 perfiles */}
        <div className="experts__grid">
          {team.map((m, idx) => (
            <article className="experts__card" key={idx}>
              <div className="experts__avatar">
                <img src={m.img} alt={m.name} loading="lazy" />
              </div>
              <h3 className="experts__name">{m.name}</h3>
              <a href="#contacto" className="experts__role">{m.role}</a>
              <p className="experts__blurb">{m.blurb}</p>
            </article>
          ))}
        </div>

        {/* Botón final */}
        <HoverBorderGradient as="a" href="#contacto" className="boton_acompañantes">
          Agendar una Cita
        </HoverBorderGradient>

      </div>
    </section>
  );
}
