import React from "react";
import HoverBorderGradient from "./ui/hover-border-gradient";

export default function CtaIA() {
  return (
    <>
      <h2 className="h2">¿Dudas sobre un procedimiento?</h2>
      <p className="lead max-w-prose" style={{ margin: "0 auto var(--space-6)" }}>
        Utilice nuestra herramienta de consulta con IA para obtener un resumen
        rápido y los siguientes pasos recomendados. Es fácil, rápido y confidencial.
      </p>
    <HoverBorderGradient
                  as="a"
                  href="#testimonios"
                  className="btn btn--ghost"
                >
      <a href="/consulta-ia" >Probar IA</a>
    </HoverBorderGradient>
    </>
  );

}
