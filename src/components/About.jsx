// src/components/About.jsx
import React from "react";
import HoverBorderGradient from "./ui/hover-border-gradient";
import Imagen_About from "../img/About_me.jpg";

export default function About() {
  return (
    <div className="about__grid">
      <figure className="about__photo">
        <img
          src={Imagen_About}
          alt="Dr. Orlando en quirófano"
          className="imagen_about"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
      </figure>

      <div className="about__content">
        <br></br>
        <h2 className="h1">Conozca al Dr. Orlando Santillán</h2>
        <br></br>
        <p className="about__p">
          Soy el <span className="about__keyword">Dr. Orlando Santillán</span>, un
          cirujano plástico certificado con
          más de 15 años de experiencia, reconocido por mi
          enfoque artístico y por mi compromiso con la
          seguridad y la <span className="about__keyword">satisfacción de mis pacientes</span>.
        </p>

        <p className="about__p">
          Graduado con honores de la
          Universidad Central del Ecuador y con
          especializaciones en <span className="about__keyword">Brasil y Estados Unidos</span>, combino
          técnicas avanzadas con un entendimiento profundo de la
          anatomía y la
          estética para <span className="about__keyword">lograr resultados armónicos y naturales</span>.
        </p>

        <div className="about__cta">
          <HoverBorderGradient as="a" href="#/contacto" className="hbg--light">
            Solicitar consulta
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
}
