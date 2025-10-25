"use client";
import React from "react";
import { AnimatedTestimonials } from "../components/ui/AnimatedTestimonials";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "La atención y el profesionalismo del Dr. y su equipo fueron excepcionales. ¡Los resultados superaron mis expectativas! Totalmente recomendados.",
      name: "María G.",
      designation: "Paciente de rinoplastia",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "Desde la primera consulta sentí una confianza increíble. El Dr. entendió perfectamente lo que quería y el resultado fue natural y hermoso.",
      name: "Sofía V.",
      designation: "Paciente de lifting facial",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "Un cambio de vida. No solo mejoró mi apariencia, sino también mi autoestima. Agradecido por siempre con todo el equipo.",
      name: "Carlos R.",
      designation: "Paciente de mentoplastia",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "El proceso fue claro, seguro y el acompañamiento postoperatorio excelente. Sin duda volvería a elegirlos.",
      name: "Valentina P.",
      designation: "Paciente de aumento mamario",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  return (
    <section id="testimonios" className="section testis">
      <div className="container">
        <header className="testis__head">
          <h2 className="h2">Testimonios</h2>
          <p className="lead">
            Experiencias reales de pacientes que confiaron en nuestro equipo.
          </p>
        </header>

        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
