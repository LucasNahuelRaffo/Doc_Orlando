// src/components/ConsultationAI.jsx
import React, { useState, useRef } from "react";

/**
 * Página Consulta IA mejorada:
 * - "Limpiar" borra textarea, limpia preview y devuelve el foco.
 * - Integración preparada para llamar a un endpoint backend (/api/ai/resume).
 */

export default function ConsultationAI() {
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);

  // Limpiar: borra notas y preview, devuelve foco
  function handleClear() {
    setNotes("");
    setSummary(null);
    setError(null);
    // devolver foco al textarea (mejora UX)
    if (textareaRef.current) textareaRef.current.focus();
  }

  // Generar resumen: si tienes backend, lo llamas en POST a /api/ai/resume
  async function handleGenerate(e) {
    e.preventDefault();
    setError(null);

    const text = (notes || "").trim();
    if (!text) {
      setError("Por favor ingrese notas para generar un resumen.");
      return;
    }

    setLoading(true);
    setSummary(null);

    try {
      // Llamada al backend que debe hacer la petición a la IA (explicado más abajo)
      const res = await fetch("/api/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: text }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Error en el servidor");
      }

      const data = await res.json();
      const aiSummary = data.summary || data.result || "No se obtuvo respuesta.";

      // guardar en historial
      const entry = {
        id: Date.now(),
        text,
        summary: aiSummary,
        createdAt: new Date().toLocaleString(),
      };
      setHistory((s) => [entry, ...s]);
      setSummary(aiSummary);
      setNotes(""); // opcional: limpiar notas tras generar
    } catch (err) {
      console.error(err);
      setError("No se pudo generar el resumen. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section" style={{ paddingTop: "3.5rem", paddingBottom: "4rem" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <header style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <h1 className="h2" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
            Consulta Virtual con IA
          </h1>
          <p className="lead" style={{ maxWidth: 820, margin: "12px auto 0" }}>
            Describa sus inquietudes o pegue las notas de una consulta y nuestra IA generará un
            resumen claro y sugerirá los próximos pasos a seguir. Esta herramienta es para fines
            informativos y no reemplaza una consulta médica real.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.5rem", marginTop: "2.25rem" }}>
          <div className="surface rounded-xl shadow" style={{ padding: "1rem" }}>
            <h3 className="h3" style={{ margin: 0, marginBottom: ".5rem" }}>Ingrese sus Notas</h3>

            <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: ".75rem", marginTop: ".75rem" }}>
              <textarea
                ref={textareaRef}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe aquí los síntomas, preguntas o información de la consulta..."
                style={{
                  minHeight: 200,
                  resize: "vertical",
                  width: "100%",
                  padding: "1rem",
                  borderRadius: 8,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.04)",
                  color: "inherit",
                }}
              />

              {error && <div style={{ color: "#ffb3b3", fontWeight: 600 }}>{error}</div>}

              {summary && (
                <div style={{ background: "rgba(255,255,255,0.02)", padding: ".75rem", borderRadius: 8, border: "1px solid rgba(255,255,255,0.03)" }}>
                  <strong>Resumen generado:</strong>
                  <p style={{ margin: ".5rem 0 0", color: "var(--blanco-perla)", opacity: .9 }}>{summary}</p>
                </div>
              )}

              <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
                <div className="hbg" style={{ display: "inline-flex" }}>
                  <button type="submit" className="hbg__btn btn btn--primary" style={{ minWidth: 220 }} disabled={loading}>
                    {loading ? "Generando…" : "✨ Generar Resumen"}
                  </button>
                  <span className="hbg__halo" aria-hidden="true" />
                </div>

                <button type="button" className="btn btn--ghost" onClick={handleClear} title="Limpiar">
                  Limpiar
                </button>
              </div>
            </form>
          </div>

          <aside>
            <div className="surface rounded-xl shadow" style={{ padding: "1rem" }}>
              <h3 className="h3" style={{ margin: 0, marginBottom: ".5rem" }}>Historial de Consultas</h3>
              <div style={{ marginTop: ".75rem", minHeight: 80 }}>
                {history.length === 0 ? (
                  <p className="muted" style={{ margin: 0 }}>No hay consultas guardadas.</p>
                ) : (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: ".6rem" }}>
                    {history.map((h) => (
                      <li key={h.id} style={{ borderRadius: 8, padding: ".6rem", background: "transparent", border: "1px solid rgba(255,255,255,0.03)" }}>
                        <div style={{ fontWeight: 700 }}>{h.createdAt}</div>
                        <div style={{ fontSize: ".95rem", color: "var(--blanco-perla)", opacity: .88, marginTop: ".25rem" }}>
                          {h.summary ? (
                            <><strong>Resumen:</strong> <div style={{marginTop:4}}>{h.summary}</div></>
                          ) : (
                            <div>{h.text.slice(0, 140)}{h.text.length>140 ? "…" : ""}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
