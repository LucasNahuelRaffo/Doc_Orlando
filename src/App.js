// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import ScrollToTop from "./components/ScrollToTop"; // <- componente que fuerza scroll al top
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import CtaIA from "./components/CtaIA";
import ThreeDCardDemo from "./components/ThreeDCardDemo";

// Lazy pages (mejora el bundle)
const ProceduresPageLazy = React.lazy(() => import("./components/Procedures"));
const ProcedureDetailPageLazy = React.lazy(() => import("./components/ProcedureDetail"));
const GalleryPageLazy = React.lazy(() => import("./components/Gallery"));
const ConsultationPageLazy = React.lazy(() => import("./components/ConsultationAI"));
const ContactPageLazy = React.lazy(() => import("./components/Contact"));

function Home() {
  return (
    <main tabIndex={-1}>
      <Hero />

      {/* PROCEDIMIENTOS DESTACADOS */}
      <section id="procedimientos" className="section procs">
        <div className="container">
          <header className="procs__head">
            <h2 className="h2">Procedimientos Destacados</h2>
            <p className="procs__sub">
              Ofrecemos una gama de procedimientos estéticos diseñados para
              realzar su belleza natural con resultados excepcionales.
            </p>
          </header>

          <section className="section">
            <div className="container">
              <ThreeDCardDemo />
            </div>
          </section>
        </div>
      </section>

      {/* ABOUT DOCTOR */}
      <section id="doctor" className="section about">
        <div className="container">
          <About />
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonios" className="section testis">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      {/* CTA IA */}
      <section id="consulta-ia" className="section cta">
        <div className="container">
          <CtaIA />
        </div>
      </section>
    </main>
  );
}

// Suspense boundary simple
function SuspenseBoundary({ children }) {
  return (
    <React.Suspense fallback={<div style={{ padding: 24 }}>Cargando…</div>}>
      {children}
    </React.Suspense>
  );
}

export default function App() {
  return (
    <Router>
      {/* ScrollToTop escucha cambios en la ruta y hace scroll al inicio */}
      <ScrollToTop behavior="smooth" />

      <Navbar />

      <Routes>
        {/* Home: "/" y "/inicio" */}
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />

        {/* Procedimientos list / detalle */}
        <Route
          path="/procedimientos"
          element={
            <SuspenseBoundary>
              <ProceduresPageLazy />
            </SuspenseBoundary>
          }
        />
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

        {/* CONTACTO */}
        <Route
          path="/contacto"
          element={
            <SuspenseBoundary>
              <ContactPageLazy />
            </SuspenseBoundary>
          }
        />

        {/* Fallback: si la ruta no coincide, mostramos Home */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  );
}
