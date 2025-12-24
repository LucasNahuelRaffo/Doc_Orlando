"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Info,
  ClipboardList,
  HeartPulse,
  ShieldAlert,
  WalletMinimal,
  ChevronDown,
} from "lucide-react";

/* Categorías + íconos */
const CATEGORIES = [
  { key: "general", label: "Preguntas Generales", icon: Info },
  { key: "pre", label: "Pre-cirugía", icon: ClipboardList },
  { key: "post", label: "Post-cirugía y Recuperación", icon: HeartPulse },
  { key: "riesgos", label: "Riesgos y Seguridad", icon: ShieldAlert },
  { key: "costos", label: "Costos y Financiación", icon: WalletMinimal },
];

/* Preguntas por categoría */
const QA = {
  general: [
    {
      q: "¿Cuál es el primer paso para considerar una cirugía estética?",
      a: "Agendar una consulta con el especialista. En esa cita se evalúan objetivos, antecedentes y se propone un plan personalizado con opciones y expectativas realistas.",
    },
    {
      q: "¿Cómo sé qué procedimiento es el adecuado para mí?",
      a: "Tras un examen clínico y conversar sobre tus metas, el cirujano explica alternativas, beneficios, límites y recuperación de cada opción para una decisión informada.",
    },
    {
      q: "¿Son permanentes los resultados de la cirugía estética?",
      a: "Muchos resultados son duraderos, pero el envejecimiento y cambios de peso influyen. Mantener hábitos saludables ayuda a preservar los efectos a largo plazo.",
    },
  ],
  pre: [
    {
      q: "¿Qué estudios necesito antes de la cirugía?",
      a: "Depende del procedimiento y tu historia clínica, pero suelen incluir laboratorio básico, evaluación cardiológica y, si corresponde, imágenes específicas.",
    },
    {
      q: "¿Debo suspender medicación o suplementos?",
      a: "Siempre informá todo lo que tomás. Algunos fármacos/antiinflamatorios/suplementos se suspenden para reducir riesgo de sangrado.",
    },
  ],
  post: [
    {
      q: "¿Cómo es el dolor y cuánto dura la recuperación?",
      a: "El dolor suele ser controlable con medicación. La recuperación inicial varía entre 1 y 3 semanas según el procedimiento; las restricciones se explican por escrito.",
    },
    {
      q: "¿Cuándo puedo retomar el ejercicio?",
      a: "Actividad suave a la 1-2 semana si tu cirujano lo aprueba; entrenamiento de fuerza o alto impacto suele reanudarse gradualmente después de 4-6 semanas.",
    },
  ],
  riesgos: [
    {
      q: "¿Qué riesgos existen y cómo se minimizan?",
      a: "Toda cirugía implica riesgos (sangrado, infección, cicatrización). Se reducen con una buena evaluación preoperatoria, técnica adecuada y seguimiento cercano.",
    },
  ],
  costos: [
    {
      q: "¿Qué incluye un presupuesto?",
      a: "Honorarios médicos, gastos de quirófano, internación, materiales y controles. Se detalla por escrito para evitar sorpresas.",
    },
    {
      q: "¿Ofrecen financiación?",
      a: "Según el caso, podemos ofrecer planes y medios de pago. Consultá durante la evaluación para opciones vigentes.",
    },
  ],
};

export default function FAQ() {
  const [cat, setCat] = useState("general");
  const [open, setOpen] = useState(0); // índice abierto en la lista actual
  const sectionRef = useRef(null);
  const [lineProgress, setLineProgress] = useState(0);

  // reveal del bloque al entrar en viewport (aprovecha tus estilos .is-inview)
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && node.classList.add("is-inview"));
      },
      { threshold: 0.28, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // línea celeste bajo el título que se completa según el scroll
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Calcula cuánto de la sección está visible
      // Cuando el bottom de la sección entra en pantalla, progress = 0
      // Cuando el top de la sección llega al top de la pantalla, progress = 1
      const visibleStart = vh; // Cuando el top está en el bottom del viewport
      const visibleEnd = 0;    // Cuando el top está en el top del viewport

      // Progreso basado en la posición del top de la sección
      let progress = 0;
      if (rect.top <= visibleStart && rect.top >= visibleEnd) {
        // La sección está visible, calcula el progreso
        progress = (visibleStart - rect.top) / (visibleStart - visibleEnd);
      } else if (rect.top < visibleEnd) {
        // La sección ya pasó completamente
        progress = 1;
      }

      // Asegura que el progreso esté entre 0 y 1
      progress = Math.min(1, Math.max(0, progress));

      setLineProgress(progress);
    };

    handleScroll(); // estado inicial
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const items = QA[cat] ?? [];
  const toggle = (i) => setOpen(open === i ? -1 : i);

  return (
    <section ref={sectionRef} id="faq" className="section faq marked">
      <div className="container">
        <h1
          className="titulo_preguntasfrecuentes"
          style={{ "--faq-line-progress": lineProgress }}
        >
          Encuentra tus{" "}
          <span className="titulo_preguntasfrecuentes__accent">Respuestas</span>
        </h1>

        <p className="faq__subtitle">
          Navega por las categorías para resolver tus dudas.
        </p>

        <div className="faq__layout">
          {/* Lateral */}
          <nav className="faq-nav" aria-label="Categorías de preguntas">
            {CATEGORIES.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`faq-nav__btn ${cat === key ? "is-active" : ""}`}
                onClick={() => {
                  setCat(key);
                  setOpen(0);
                }}
                type="button"
              >
                <span className="faq-nav__icon">
                  <Icon size={18} />
                </span>
                <span className="faq-nav__label">{label}</span>
              </button>
            ))}
          </nav>

          {/* Acordeón */}
          <div className="faq-acc" role="region" aria-label="Listado de preguntas">
            {items.map((it, i) => {
              const expanded = open === i;
              return (
                <div
                  key={i}
                  className={`faq-acc__item ${expanded ? "is-open" : ""}`}
                  style={{ "--stagger": `${i * 90}ms` }}
                >
                  <button
                    className="faq-acc__q"
                    onClick={() => toggle(i)}
                    aria-expanded={expanded}
                    type="button"
                  >
                    <span>{it.q}</span>
                    <ChevronDown className="faq-acc__chev" size={18} aria-hidden />
                  </button>

                  <div className="faq-acc__a" aria-hidden={!expanded}>
                    <div className="faq-acc__a-inner">
                      <p>{it.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
