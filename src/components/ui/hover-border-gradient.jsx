"use client";
import React from "react";

/**
 * HoverBorderGradient (vanilla CSS)
 * - No usa Tailwind ni clsx
 * - Aplica halo/gradiente animado en el borde
 * - Usa tokens de tu CSS: --onix-quirurgico, --blanco-perla, --azul-cirugia
 *
 * Props:
 * - as: "a" | "button" (default "a")
 * - href: si as="a"
 * - children: contenido del botón
 * - className: clases extras si querés
 */
export const HoverBorderGradient = ({
  as: Tag = "a",
  href = "#!",
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`hbg ${className}`}>
      <Tag
        href={Tag === "a" ? href : undefined}
        className="hbg__btn"
        {...props}
      >
        {children}
      </Tag>
      <span aria-hidden className="hbg__halo" />
    </div>
  );
};

export default HoverBorderGradient;
