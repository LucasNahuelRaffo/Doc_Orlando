"use client";
import React, { useRef } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

/**
 * CardContainer
 * - maneja el tilt 3D
 * - limita el ángulo para que no “desaparezca”
 * - se frena cuando el mouse se queda quieto
 */
export function CardContainer({ children, className = "", ...props }) {
  const rootRef = useRef(null);
  const frameRef = useRef(0);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const maxRotate = 10; // 🔹 límite en grados

  const update = () => {
    const el = rootRef.current;
    if (!el) {
      frameRef.current = 0;
      return;
    }

    const damping = 0.12; // suavizado
    current.current.x += (target.current.x - current.current.x) * damping;
    current.current.y += (target.current.y - current.current.y) * damping;

    // si ya casi no se mueve, lo dejamos en 0 y frenamos el loop
    if (
      Math.abs(current.current.x - target.current.x) < 0.02 &&
      Math.abs(current.current.y - target.current.y) < 0.02 &&
      Math.abs(target.current.x) < 0.05 &&
      Math.abs(target.current.y) < 0.05
    ) {
      current.current = { x: 0, y: 0 };
      el.style.setProperty("--card-rotate-x", "0deg");
      el.style.setProperty("--card-rotate-y", "0deg");
      frameRef.current = 0;
      return;
    }

    el.style.setProperty("--card-rotate-x", `${current.current.x}deg`);
    el.style.setProperty("--card-rotate-y", `${current.current.y}deg`);

    frameRef.current = requestAnimationFrame(update);
  };

  const scheduleUpdate = () => {
    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(update);
    }
  };

  const handleMouseMove = (e) => {
    const el = rootRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    // mapeamos posición -> rotación limitada
    let rotateY = ((x - midX) / midX) * maxRotate;
    let rotateX = ((midY - y) / midY) * maxRotate;

    // clamp por seguridad
    rotateX = Math.max(-maxRotate, Math.min(maxRotate, rotateX));
    rotateY = Math.max(-maxRotate, Math.min(maxRotate, rotateY));

    target.current = { x: rotateX, y: rotateY };
    scheduleUpdate();
  };

  const handleMouseLeave = () => {
    // volver suave al centro
    target.current = { x: 0, y: 0 };
    scheduleUpdate();
  };

  return (
    <div
      ref={rootRef}
      className={cn("card3d", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardBody
 * - aplica el transform 3D
 */
export function CardBody({ children, className = "", style, ...props }) {
  return (
    <div
      className={cn("card3d-body", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardItem
 * - elementos internos con profundidad (translateZ)
 */
export function CardItem({
  children,
  className = "",
  translateZ = 0,
  as: Component = "div",
  style,
  ...props
}) {
  const z = typeof translateZ === "string" ? parseFloat(translateZ) || 0 : translateZ;

  return (
    <Component
      className={cn("card3d-item", className)}
      style={{
        transform: `translateZ(${z}px)`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
