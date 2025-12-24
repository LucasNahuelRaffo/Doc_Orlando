// src/components/FinalSection.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import video from "../img/VideoNuevofinal.mp4";

const FinalSection = () => {
  const videoRef = useRef(null);
  const isVisibleRef = useRef(false);

  const handleEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    isVisibleRef.current = true;
    v.muted = false;
    const p = v.play?.();
    if (p && p.catch) p.catch(() => { });
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    isVisibleRef.current = false;
    v.pause?.();
    v.currentTime = 0;
  };

  return (
    <section id="final-section" className="cloudy-bg final-section">
      <div className="final-section__particles" />

      <motion.div
        className="final-section__inner"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="final-section__video-vertical video-glow"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          whileHover={{ scale: 1.02 }}
          onViewportEnter={handleEnter}
          onViewportLeave={handleLeave}
        >
          <video
            ref={videoRef}
            className="final-section__video-el-vertical"
            src={video}
            preload="metadata"
            playsInline
            loop
            muted={false}
            controls
            disablePictureInPicture
            controlsList="nofullscreen noremoteplayback nodownload"
            onDoubleClick={(e) => e.preventDefault()}
          />
        </motion.div>

        <motion.div
          className="final-section__button"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <a href="#contacto" className="btn-hero-primary final-section__cta" id="Botonfinal">
            Agendar Cita
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalSection;
