import React from "react";
import HoverBorderGradient from "./ui/hover-border-gradient";

export default function About() {
  return (
    <div className="about__grid">
      <figure className="about__photo">
        Input para Foto del Doctor
      </figure>

      <div className="about__content">
        <h2 className="h2">Conozca al Dr. Orlando Santillán</h2>
        <p className="about__p">
          El Dr. Orlando Santillán es un cirujano plástico certificado con más
          de 15 años de experiencia, reconocido por su enfoque artístico y su
          compromiso con la seguridad y satisfacción del paciente.
        </p>
        <p className="about__p">
          Graduado con honores de la Universidad Central del Ecuador y con
          especializaciones en Brasil y Estados Unidos, combina técnicas
          avanzadas con un entendimiento profundo de la anatomía y la estética
          para lograr resultados armónicos y naturales.
        </p>

        <div className="about__cta">
          <HoverBorderGradient
                        as="a"
                        href="/contacto"
                        className="hbg--light"
                      >
            Solicitar consulta
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
}
