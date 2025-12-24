// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import PageLoader from "./components/ui/PageLoader";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Nabvar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import SectionScrollCues from "./components/SectionScrollCues";
import MarcaAgua from "./img/Recurso 1.png";

// Lazy pages
const ProceduresPageLazy = React.lazy(() => import("./components/Procedures"));
const ProcedureDetailPageLazy = React.lazy(() =>
  import("./components/ProcedureDetail")
);
const GalleryPageLazy = React.lazy(() => import("./components/Gallery"));
const ConsultationPageLazy = React.lazy(() =>
  import("./components/ConsultationAI")
);
const ContactPageLazy = React.lazy(() => import("./components/Contact"));
const VideosExplicativosLazy = React.lazy(() =>
  import("./components/VideosExplicativos")
);
const AboutLazy = React.lazy(() => import("./components/About"));
const TestimonialsLazy = React.lazy(() => import("./components/Testimonials"));
const CtaIALazy = React.lazy(() => import("./components/CtaIA"));
const ThreeDCardDemoLazy = React.lazy(() =>
  import("./components/ThreeDCardDemo")
);
const FAQLazy = React.lazy(() => import("./components/FAQ"));
const FinalSectionLazy = React.lazy(() => import("./components/FinalSection"));

// 🔹 NUEVA PÁGINA LEGAL (lazy)
// 🔹 NUEVA PÁGINA LEGAL (lazy)
const LegalPageLazy = React.lazy(() => import("./components/LegalPage"));
const PaymentPageLazy = React.lazy(() => import("./components/PaymentPage"));

function LazyBlock({ children, minHeight = 320 }) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // si no hay IntersectionObserver, renderizamos de inmediato
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "120px 0px 120px 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="lazy-section">
      {visible ? (
        <React.Suspense
          fallback={
            <div
              className="lazy-fallback"
              style={{ minHeight }}
              aria-hidden="true"
            />
          }
        >
          {children}
        </React.Suspense>
      ) : (
        <div
          className="lazy-fallback"
          style={{ minHeight }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function Home() {
  return (
    <main tabIndex={-1} className="app-main-with-bg">
      <SectionScrollCues />

      {/* HERO (sin marca de agua para no ensuciar el video) */}
      <section className="section marked" style={{ padding: 0 }}>
        <Hero />
      </section>

      {/* Procedimientos Destacados (home) con logo de fondo */}
      <section
        id="procedimientos-home"
        className="section procs marked section--watermark"
        style={{ marginTop: "3rem" }}
      >
        <div className="section__watermark" aria-hidden="true">
          <img src={MarcaAgua} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="container">
          <header className="procs__head">
            <h2 className="h2">Procedimientos Destacados</h2>
            <p className="procs__sub">
              Ofrecemos una gama de procedimientos estéticos diseñados para
              realzar su belleza natural con resultados excepcionales.
            </p>
            <div className="procs__swipe" aria-hidden="true">
              Deslizá <span className="procs__swipe-arrow">→</span>
            </div>
          </header>

          <LazyBlock minHeight={380}>
            <ThreeDCardDemoLazy />
          </LazyBlock>
        </div>
      </section>
      {/* ABOUT con logo sutil detrás */}
      <section
        id="doctor"
        className="section about marked section--watermark"
      >
        <div className="section__watermark" aria-hidden="true">
          <img src={MarcaAgua} alt="" loading="lazy" decoding="async" className="about_agua" />
        </div>

        <div className="container">
          <LazyBlock minHeight={520}>
            <AboutLazy />
          </LazyBlock>
        </div>
      </section>

      {/* TESTIMONIOS con logo muy suave al fondo */}
      <section
        id="testimonios"
        className="section testis marked section--watermark"
      >
        <div className="section__watermark" aria-hidden="true">
          <img src={MarcaAgua} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="container">
          <LazyBlock minHeight={420}>
            <TestimonialsLazy />
          </LazyBlock>
        </div>
      </section>

      {/* CTA IA con marca de agua */}
      <section
        id="consulta-ia"
        className="section cta marked section--watermark"
      >
        <div className="section__watermark" aria-hidden="true">
          <img src={MarcaAgua} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="container">
          <LazyBlock minHeight={380}>
            <CtaIALazy />
          </LazyBlock>
        </div>
      </section>

      {/* SECCIÓN FINAL COMBINADA: FAQ (Izquierda) + VIDEO (Derecha) */}
      <section
        id="seccion-final-combinada"
        className="section marked section--watermark"
        style={{ paddingBlock: "4rem" }}
      >
        <div className="section__watermark" aria-hidden="true">
          <img src={MarcaAgua} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="container final-combined-grid">
          {/* Columna Izquierda: FAQ */}
          <div className="final-col-left">
            <LazyBlock minHeight={420}>
              <FAQLazy />
            </LazyBlock>
          </div>

          {/* Columna Derecha: Video Final */}
          <div className="final-col-right">
            <LazyBlock minHeight={560}>
              <FinalSectionLazy />
            </LazyBlock>
          </div>
        </div>
      </section>
    </main>
  );
}

function SuspenseBoundary({ children }) {
  return (
    <React.Suspense fallback={<div style={{ padding: 24 }}>Cargando…</div>}>
      {children}
    </React.Suspense>
  );
}

export default function App() {
  return (
    <PageLoader minDelay={700}>
      <Router>
        <ScrollToTop behavior="smooth" />
        <Navbar />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />

          {/* Procedimientos (lista) */}
          <Route
            path="/procedimientos"
            element={
              <SuspenseBoundary>
                <ProceduresPageLazy />
              </SuspenseBoundary>
            }
          />
          <Route
            path="/procedures"
            element={
              <SuspenseBoundary>
                <ProceduresPageLazy />
              </SuspenseBoundary>
            }
          />

          {/* Detalle */}
          <Route
            path="/procedimiento/:slug"
            element={
              <SuspenseBoundary>
                <ProcedureDetailPageLazy />
              </SuspenseBoundary>
            }
          />

          {/* Galería */}
          <Route
            path="/galeria"
            element={
              <SuspenseBoundary>
                <GalleryPageLazy />
              </SuspenseBoundary>
            }
          />

          {/* Consulta IA */}
          <Route
            path="/consulta-ia"
            element={
              <SuspenseBoundary>
                <ConsultationPageLazy />
              </SuspenseBoundary>
            }
          />
          {/* Contacto */}
          <Route
            path="/contacto"
            element={
              <SuspenseBoundary>
                <ContactPageLazy />
              </SuspenseBoundary>
            }
          />
          <Route
            path="/videos-explicativos"
            element={
              <SuspenseBoundary>
                <VideosExplicativosLazy />
              </SuspenseBoundary>
            }
          />

          {/* 🔹 LEGAL: Políticas de Privacidad + Términos + Reembolsos */}
          <Route
            path="/politicas-privacidad-terminos"
            element={
              <SuspenseBoundary>
                <LegalPageLazy />
              </SuspenseBoundary>
            }
          />

          {/* Payment Page */}
          <Route
            path="/payment"
            element={
              <SuspenseBoundary>
                <PaymentPageLazy />
              </SuspenseBoundary>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
      </Router>
    </PageLoader>
  );
}
