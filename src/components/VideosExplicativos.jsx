"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import videoGluteos from "../img/entregable_-_aumento_de_glúteos_(4k)_v1 (1440p).mp4";
import videoFacial from "../img/entregable_-_facial_(4k)_v1 (1440p).mp4";
import videoNoQuirurgico from "../img/entregable_-_no_quirúrgico_(4k)_v1 (1080p).mp4";
import videoContorno from "../img/Contorno corporal (1080p 60fps).compressed.mp4";
import MarcaAgua from "../img/Recurso 1.png";

const normalize = (value) =>
  (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const videos = [
  {
    title: "Aumento de gluteos",
    description: "Indicaciones y cuidados clave para tu proceso.",
    src: videoGluteos,
    matches: ["gluteo", "gluteoplastia"],
  },
  {
    title: "Facial",
    description: "Guia rapida para aprovechar tu tratamiento.",
    src: videoFacial,
    matches: [
      "facial",
      "blefaroplastia",
      "bichectomia",
      "rinoseptoplastia",
      "papada",
      "otoplastia",
      "lifting facial",
      "estetica facial",
    ],
  },
  {
    title: "Aumento de mamas",
    description: "Indicaciones clave para tu procedimiento.",
    src: videoContorno,
    matches: [
      "aumento de mamas",
      "mamoplastia",
      "ginecomastia",
      "glandulas mamarias",
    ],
  },
  {
    title: "Contorno corporal",
    description: "Indicaciones clave para contorno y recuperacion.",
    src: videoContorno,
    matches: [
      "contorno",
      "lipoescultura",
      "abdominoplastia",
      "mini abdominoplastia",
      "braquioplastia",
      "cruroplastia",
      "labioplastia",
      "himen",
      "monte de venus",
      "pantorrillas",
      "lifting de brazos",
      "lifting de muslos",
    ],
  },
  {
    title: "No quirurgico",
    description: "Recomendaciones generales antes y despues.",
    src: videoNoQuirurgico,
    matches: [
      "toxina",
      "hialuronico",
      "laser",
      "cicatrices",
      "lunares",
      "tumores",
      "lipomas",
      "no quirurgico",
    ],
  },
];

export default function VideosExplicativos() {
  const location = useLocation();
  const [procedure, setProcedure] = useState(() => {
    const state = location.state || {};
    return {
      procedimiento: state.procedimiento || "",
      procedimientoOtro: state.procedimientoOtro || "",
    };
  });

  useEffect(() => {
    if (procedure.procedimiento) return;
    try {
      const saved = JSON.parse(
        window.localStorage.getItem("ea_video_procedimiento") || "{}"
      );
      if (saved.procedimiento) {
        setProcedure({
          procedimiento: saved.procedimiento || "",
          procedimientoOtro: saved.procedimientoOtro || "",
        });
      }
    } catch (error) {
      console.error("No se pudo leer el procedimiento para videos:", error);
    }
  }, [procedure.procedimiento]);

  const rawProcedure =
    procedure.procedimiento === "Otro"
      ? procedure.procedimientoOtro
      : procedure.procedimiento;
  const normalizedProcedure = normalize(rawProcedure);

  const selectedVideo = useMemo(() => {
    if (!normalizedProcedure) return null;
    return videos.find((video) =>
      video.matches.some((match) => normalizedProcedure.includes(match))
    );
  }, [normalizedProcedure]);

  const vslMaxWidth = 360;
  const columnStyle = {
    width: "100%",
    maxWidth: vslMaxWidth,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "1rem",
  };

  return (
    <section
      className="section section--watermark"
      style={{ paddingTop: "8rem", paddingBottom: "4rem" }}
    >
      <div className="section__watermark" aria-hidden="true">
        <img src={MarcaAgua} alt="" loading="lazy" decoding="async" />
      </div>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={columnStyle}>
          <header style={{ marginBottom: "0.75rem", width: "100%" }}>
            <h2
              className="h2-contact"
              style={{
                whiteSpace: "nowrap",
                fontSize: "60px",
                lineHeight: 1.1,
                marginLeft:"-80px",
              }}
            >
              Videos explicativos
            </h2>
            <p className="lead" style={{ marginTop: ".75rem" }}>
              Encuentra aqui los videos con indicaciones del Dr. Santillan.
            </p>
            <div
              style={{
                marginTop: "1rem",
                padding: "0.9rem 1rem",
                borderRadius: "12px",
                border: "1px solid var(--divider, rgba(255,255,255,.08))",
                background: "rgba(255,255,255,0.04)",
                width: "100%",
              }}
            >
              <strong>Importante:</strong> esta es la unica vez que puedes ver
              estos videos. Material exclusivo para clientes.
            </div>
          </header>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}
          >
            <div className="muted" style={{ width: "100%" }}>
              Procedimiento seleccionado: {rawProcedure || "No especificado"}
            </div>

            {selectedVideo ? (
              <article
                style={{
                  background: "var(--surface-1, #171F21)",
                  borderRadius: "16px",
                  border: "1px solid var(--divider, rgba(255,255,255,.08))",
                  boxShadow: "var(--shadow, 0 8px 30px rgba(0,0,0,.35))",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#000",
                    width: "100%",
                    aspectRatio: "9 / 16",
                  }}
                >
                  <video
                  src={selectedVideo.src}
                  controls
                  autoPlay
                  muted
                  preload="metadata"
                  playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{selectedVideo.title}</div>
                  <p
                    className="muted"
                    style={{ marginTop: ".35rem", fontSize: ".95rem" }}
                  >
                    {selectedVideo.description}
                  </p>
                </div>
              </article>
            ) : (
              <div
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  border: "1px solid var(--divider, rgba(255,255,255,.08))",
                  background: "rgba(255,255,255,0.04)",
                  padding: "1.25rem",
                }}
              >
                <strong>No encontramos un video asignado a este procedimiento.</strong>
                <div className="muted" style={{ marginTop: ".4rem" }}>
                  Si necesitas ayuda, escribenos y lo habilitamos.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
