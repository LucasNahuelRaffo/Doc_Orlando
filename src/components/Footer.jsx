"use client";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoDark from "../img/Recurso 2.png"; // oscuro
import logoLight from "../img/Recurso 1.png"; // claro

export default function Footer() {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const [logoSrc, setLogoSrc] = useState(logoDark);

  // Tema: logo según claro/oscuro
  useEffect(() => {
    const getTheme = () =>
      (typeof window !== "undefined" &&
        (window.localStorage.getItem("theme") ||
          document.documentElement.getAttribute("data-theme"))) || "dark";

    const apply = () => {
      const t = getTheme();
      setLogoSrc(t === "light" ? logoLight : logoDark);
    };

    apply();
    const onTheme = () => apply();
    window.addEventListener("themeChange", onTheme);
    return () => window.removeEventListener("themeChange", onTheme);
  }, []);

  // Reveal on scroll (stagger por columnas + línea divisoria)
  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) return;

    const cols = Array.from(node.querySelectorAll(".footer__grid > *"));
    cols.forEach((el, i) => el.style.setProperty("--f-stagger", `${i * 90}ms`));

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            node.classList.add("is-inview");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  function navigateSmart(paths = ["/"], anchorId = null, e) {
    if (e && e.preventDefault) e.preventDefault();
    const current = window.location.pathname || "/";
    if (paths.includes(current)) {
      if (anchorId) scrollToAnchor(anchorId);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = paths[0] || "/";
    navigate(target);
    setTimeout(() => {
      if (anchorId) scrollToAnchor(anchorId);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
  }

  function scrollToAnchor(id) {
    if (!id) return;
    const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer ref={rootRef} className="footer">
      <div className="container footer__grid">
        {/* BRAND + TEXTO + REDES */}
        <div className="footer__brand f-reveal">
          <img src={logoSrc} alt="Ecuador Aesthetics" className="footer__logo" />
          <p>
            Comprometidos con la excelencia en cirugía plástica y estética,
            brindando resultados que inspiran confianza.
          </p>

          <ul className="footer__social">
            <li>
              <a
                aria-label="Instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" role="img">
                  <path
                    fill="currentColor"
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11 2.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 .002 6.002A3 3 0 0 0 12 9Z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="Facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" role="img">
                  <path
                    fill="currentColor"
                    d="M13 22v-8h3l1-3h-4V9a1 1 0 0 1 1-1h3V5h-3a4 4 0 0 0-4 4v2H7v3h3v8h3Z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="WhatsApp"
                href="https://wa.me/593991234567"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" role="img">
                  <path
                    fill="currentColor"
                    d="M20.5 3.5A11 11 0 0 0 2.5 19l-1 3 3-1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5ZM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-1.9.6.6-1.8-.2-.3A9 9 0 1 1 12 21Zm5.2-6.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1l-.5.6c-.2.2-.4.2-.7.1-1.1-.4-2-1.3-2.6-2.3-.2-.4 0-.6.2-.8l.3-.4c.2-.2.3-.4.2-.7 0-.2-.7-1.6-.9-2s-.5-.4-.7-.4h-.6c-.2 0-.5.1-.6.3-.7.7-1 1.6-1 2.6 0 .4.1.9.3 1.3.6 1.4 1.8 3 3.3 3.8 1 .5 1.8.8 2.9 1 .5.1 1 0 1.5-.3.5-.3 1.1-1 1.3-1.5.2-.4.2-.7.1-.8Z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* NAVEGACIÓN */}
        <div className="f-reveal">
          <h4 className="footer__title">Navegación</h4>
          <ul>
            <li>
              <a href="/inicio" onClick={(e) => navigateSmart(["/inicio", "/"], null, e)}>
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/procedimientos"
                onClick={(e) => navigateSmart(["/procedimientos", "/procedures"], null, e)}
              >
                Procedimientos
              </a>
            </li>
            <li>
              <a
                href="/galeria"
                onClick={(e) => navigateSmart(["/galeria", "/gallery"], "galeria", e)}
              >
                Galería
              </a>
            </li>
            <li>
              <a
                href="/contacto"
                onClick={(e) => navigateSmart(["/contacto", "/contact"], "contacto", e)}
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* LEGAL */}
        <div className="f-reveal">
          <h4 className="footer__title">Legal</h4>
          <ul>
            <li>
              <a
                href="/politicas-privacidad-terminos"
                onClick={(e) =>
                  navigateSmart(
                    ["/politicas-privacidad-terminos"],
                    "privacidad",
                    e
                  )
                }
              >
                Política de Privacidad
              </a>
            </li>
            <li>
              <a
                href="/politicas-privacidad-terminos"
                onClick={(e) =>
                  navigateSmart(
                    ["/politicas-privacidad-terminos"],
                    "terminos",
                    e
                  )
                }
              >
                Términos de Servicio
              </a>
            </li>
          </ul>
        </div>

        {/* UBICACIÓN */}
        <div className="f-reveal">
          <h4 className="footer__title">Ubicación</h4>
          <address className="footer__address">
            Alemania y Av. Eloy Alfaro. Edificio SOLEMNI . Consultorio 402.
            <br />
            Quito, Ecuador
            <br />
            <a
              href="https://maps.app.goo.gl/36Z7EDzQtirp8R3U6"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "underline", marginTop: "0.5rem", display: "inline-block" }}
            >
              Ver en Google Maps
            </a>
            <br />
            <br />
            <a href="mailto:orlando.cplastica@gmail.com">orlando.cplastica@gmail.com</a>
            <br />
            <a href="tel:+593991234567">+0987433813</a>
          </address>
        </div>
      </div>

      <div className="container">
        <hr className="divider footer__divider" />
        <div className="footer__bottom">
          <small>© 2025 Doctor Santillán. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}
