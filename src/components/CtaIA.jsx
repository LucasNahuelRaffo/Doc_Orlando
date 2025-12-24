import React from "react";
import HoverBorderGradient from "./ui/hover-border-gradient";

export default function CtaIA() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="h2" style={{ marginBottom: "1rem", marginTop: "10px" }}>¿Dudas sobre un procedimiento?</h2>
      <p className="lead max-w-prose" style={{ margin: "0 auto 1.5rem", color: "black" }}>
        Converse con nuestro asistente virtual para obtener respuestas rápidas
        y orientación personalizada. Es fácil, rápido y confidencial.
      </p>
      <HoverBorderGradient
        as="a"
        href="#consulta-ia"
        containerClassName="cta-ia-button"
      >
        Hablar con el Asistente
      </HoverBorderGradient>
    </div>
  );
}
