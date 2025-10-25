"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedTestimonials({ testimonials = [], interval = 5000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(id);
  }, [testimonials.length, interval]);

  const t = testimonials[index];

  return (
    <div className="animated-testimonial">
      <AnimatePresence mode="wait">
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="animated-testimonial__card"
        >
          <img src={t.src} alt={t.name} className="animated-testimonial__img" />
          <blockquote className="animated-testimonial__quote">“{t.quote}”</blockquote>
          <div className="animated-testimonial__meta">
            <strong>{t.name}</strong>
            <span>{t.designation}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="animated-testimonial__dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "dot--active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
