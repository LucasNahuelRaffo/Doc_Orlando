// src/components/Hero.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import video from "../img/VSL Preview 2.mp4";
import SplitText from "./SplitText";

export default function Hero() {
  const videoRef = useRef(null);

  // estado de audio
  const audioEnabledRef = useRef(false); // para la lógica interna
  const [isAudioOn, setIsAudioOn] = useState(false); // para el render del botón

  // Variantes para animar botones y chips
  const groupVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: customDelay,
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    }),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // estado inicial: preview silencioso
    el.muted = true;
    el.volume = 0;
    el.currentTime = 0;

    const playPromise = el.play?.();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => { });
    }

    // 🔁 loop de 4s mientras el audio NO está activado
    const handlePreviewLoop = () => {
      if (!audioEnabledRef.current && el.currentTime > 4) {
        el.currentTime = 0;
      }
    };
    el.addEventListener("timeupdate", handlePreviewLoop);

    // 👁 volumen según visibilidad (solo cuando el audio está ON)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== el) return;

          const ratio = entry.intersectionRatio || 0;

          // si el audio está apagado, solo play/pause suave
          if (!audioEnabledRef.current) {
            if (ratio === 0) {
              el.pause?.();
            } else if (el.paused) {
              const p = el.play?.();
              if (p && p.catch) p.catch(() => { });
            }
            return;
          }

          // audio activado: fade de volumen con el scroll
          if (ratio > 0) {
            const volume = Math.min(1, Math.max(0, ratio * 1.2));
            el.volume = volume;
            el.muted = volume === 0;

            if (el.paused) {
              const p = el.play?.();
              if (p && p.catch) p.catch(() => { });
            }
          } else {
            el.volume = 0;
            el.muted = true;
            el.pause?.();
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    observer.observe(el);

    // pequeña animación de entrada
    const id = window.requestAnimationFrame(() => {
      el.classList.add("is-visible");
    });

    return () => {
      window.cancelAnimationFrame(id);
      observer.disconnect();
      el.removeEventListener("timeupdate", handlePreviewLoop);
    };
  }, []);

  // 🔊 activar audio (solo una vez). Después el botón desaparece.
  const handleToggleAudio = () => {
    const el = videoRef.current;
    if (!el) return;

    // si ya está activado, no hacemos nada
    if (audioEnabledRef.current) return;

    audioEnabledRef.current = true;
    setIsAudioOn(true); // esto hace que el botón deje de renderizarse

    el.muted = false;
    el.volume = 1;
    el.currentTime = 0;
    const p = el.play?.();
    if (p && p.catch) p.catch(() => { });
  };

  // ⬆️ doble click para fullscreen
  const handleExpandHero = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.requestFullscreen) {
        const fsPromise = v.requestFullscreen();
        if (fsPromise && fsPromise.catch) fsPromise.catch(() => { });
      } else if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      }
    } catch (e) {
      console.warn("No se pudo entrar en fullscreen", e);
    }
  };

  return (
    <section id="inicio" className="section hero">
      <div className="container hero__grid">
        {/* BLOQUE DE TEXTO */}
        <div className="hero__content">
          {/* TÍTULO ANIMADO */}
          <SplitText
            text="Cirugía plástica facial con precisión estética"
            className="h1 hero__title"
            delay={80}
            duration={0.55}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-60px"
            textAlign="left"
          />

          <motion.div
            className="hero__sub-block"
            variants={groupVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <motion.p variants={itemVariants} className="hero__sub">
              Resultados naturales, seguros y personalizados
            </motion.p>
          </motion.div>

          {/* STATS ANIMADAS (REEMPLAZAN SUBTÍTULO) */}
          <motion.div
            className="hero__stats"
            variants={groupVariants}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <motion.div variants={itemVariants} className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Años de Experiencia</div>
            </motion.div>

            <motion.div variants={itemVariants} className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfacción</div>
            </motion.div>

            <motion.div variants={itemVariants} className="stat-card">
              <div className="stat-number">1500+</div>
              <div className="stat-label">Cirugías Exitosas</div>
            </motion.div>
          </motion.div>

          <div className="hero__dots" aria-hidden="true">
            <span className="hero__dot" />
            <span className="hero__dot is-active" />
            <span className="hero__dot" />
          </div>

          {/* CTAS PRINCIPALES */}
          <motion.div
            className="hero__actions"
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.8rem" }}
            variants={groupVariants}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            <motion.div variants={itemVariants}>
              <a href="#contacto" className="btn-hero-primary hero__cta-primary">
                <span className="hero__cta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <line x1="8" y1="2.5" x2="8" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="16" y1="2.5" x2="16" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                Agendar valoración
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="hero__cta-secondary">
              <a href="#/galeria" className="btn-hero-secondary">
                <span>Ver casos de éxito</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          <p className="hero__cta-note">Respuesta rápida y personalizada</p>

          {/* TRUST BADGES (NUEVO) */}
          <motion.div
            className="hero__trust"
            variants={groupVariants}
            initial="hidden"
            animate="visible"
            custom={0.8}
            style={{ marginTop: "2.5rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}
          >
            <motion.div variants={itemVariants} className="trust-item">
              <div className="trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <span>Seguridad Certificada</span>
            </motion.div>

            <motion.div variants={itemVariants} className="trust-item">
              <div className="trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              </div>
              <span>Atención Personalizada</span>
            </motion.div>

            <motion.div variants={itemVariants} className="trust-item">
              <div className="trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              </div>
              <span>Tecnología Avanzada</span>
            </motion.div>
          </motion.div>
        </div>

        {/* VIDEO EXPLICATIVO */}
        <aside className="hero__media">
          <div className="hero__video-wrapper">
            <video
              loading="lazy"
              ref={videoRef}
              src={video}
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
              className="hero__video"
              onDoubleClick={handleExpandHero}
            />

            <div className="hero__video-caption" aria-hidden="true">
              <span>Mensaje del</span>
              <strong>Dr. Orlando</strong>
            </div>

            {/* Botón de volumen: SOLO se muestra mientras el sonido está apagado */}
            {!isAudioOn && (
              <button
                type="button"
                className="hero__mute-btn is-off"
                onClick={handleToggleAudio}
                aria-label="Reproducir mensaje"
              >
                <svg
                  className="hero__mute-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5l11 7-11 7z" fill="currentColor" />
                </svg>
              </button>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
