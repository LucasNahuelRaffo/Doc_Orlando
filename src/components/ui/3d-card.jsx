"use client";
import React, { createContext, useContext, useRef, useState, useEffect } from "react";

/** Contexto para compartir el ref del “body” y actualizar transform */
const TiltContext = createContext(null);

/* ------------------------------
   CardContainer
   - maneja el mouse y setea rotaciones en CardBody vía contexto
--------------------------------*/
export function CardContainer({ children, className = "", rotateSensitivity = 20, ...props }) {
  const bodyRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0, x: 0, y: 0 });

  useEffect(() => {
    const el = bodyRef.current?.parentElement; // el contenedor visible
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setDims({ w: rect.width, h: rect.height, x: rect.left, y: rect.top });
  }, []);

  const handleMove = (e) => {
    const x = e.clientX - dims.x;
    const y = e.clientY - dims.y;
    const rx = ((y - dims.h / 2) / (dims.h / 2)) * -rotateSensitivity; // invertimos X/Y para sensación natural
    const ry = ((x - dims.w / 2) / (dims.w / 2)) * rotateSensitivity;

    if (bodyRef.current) {
      bodyRef.current.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      bodyRef.current.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      bodyRef.current.style.setProperty("--tz", `35px`);
    }
  };

  const handleLeave = () => {
    if (bodyRef.current) {
      bodyRef.current.style.setProperty("--rx", `0deg`);
      bodyRef.current.style.setProperty("--ry", `0deg`);
      bodyRef.current.style.setProperty("--tz", `0px`);
    }
  };

  return (
    <div
      className={`td3d-container ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      <TiltContext.Provider value={{ bodyRef }}>
        {children}
      </TiltContext.Provider>
    </div>
  );
}

/* ------------------------------
   CardBody
   - elemento que rota en 3D
--------------------------------*/
export function CardBody({ children, className = "", ...props }) {
  const { bodyRef } = useContext(TiltContext) || {};
  return (
    <div
      ref={bodyRef}
      className={`td3d-body ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ------------------------------
   CardItem
   - hijo con profundidad (parallax) usando translateZ
   - translateZ acepta string o número
--------------------------------*/
export function CardItem({ children, className = "", translateZ = 0, as: As = "div", ...props }) {
  const tz = typeof translateZ === "number" ? `${translateZ}px` : translateZ;
  return (
    <As
      className={`td3d-item ${className}`}
      style={{ transform: `translateZ(${tz})` }}
      {...props}
    >
      {children}
    </As>
  );
}
