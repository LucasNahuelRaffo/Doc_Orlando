"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/Recurso 2.png";

export default function Footer() {
  const navigate = useNavigate();

  // Intenta navegar a la primera ruta definida en la lista.
  // Si ya estamos en una de las rutas, hace scroll al ancla (si se provee) o al top.
  function navigateSmart(paths = ["/"], anchorId = null, e) {
    if (e && e.preventDefault) e.preventDefault();

    const current = window.location.pathname || "/";

    // Si ya estamos en alguna de las rutas posibles -> scrollear
    if (paths.includes(current)) {
      if (anchorId) {
        scrollToAnchor(anchorId);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Si no estamos, navegar al primer path de la lista
    const target = paths[0] || "/";
    navigate(target);

    // después de navegar, scrollear si corresponde (damos tiempo a render)
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
    <footer className="footer">
      <div className="container footer__grid">
        {/* BRAND + TEXTO + REDES */}
        <div className="footer__brand">
          <img src={logo} alt="Ecuador Aesthetics" className="footer__logo" />
          <p>
            Comprometidos con la excelencia en cirugía plástica y estética,
            brindando resultados que inspiran confianza.
          </p>

          <ul className="footer__social">
            <li>
              <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer">
                {/* svg */}
                <svg viewBox="0 0 24 24" width="18" height="18" role="img">
                  <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11 2.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 .002 6.002A3 3 0 0 0 12 9Z"/>
                </svg>
              </a>
            </li>
            <li>
              <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" role="img">
                  <path fill="currentColor" d="M13 22v-8h3l1-3h-4V9a1 1 0 0 1 1-1h3V5h-3a4 4 0 0 0-4 4v2H7v3h3v8h3Z"/>
                </svg>
              </a>
            </li>
            <li>
              <a aria-label="WhatsApp" href="https://wa.me/593991234567" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" role="img">
                  <path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 2.5 19l-1 3 3-1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5ZM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-1.9.6.6-1.8-.2-.3A9 9 0 1 1 12 21Zm5.2-6.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1l-.5.6c-.2.2-.4.2-.7.1-1.1-.4-2-1.3-2.6-2.3-.2-.4 0-.6.2-.8l.3-.4c.2-.2.3-.4.2-.7 0-.2-.7-1.6-.9-2s-.5-.4-.7-.4h-.6c-.2 0-.5.1-.6.3-.7.7-1 1.6-1 2.6 0 .4.1.9.3 1.3.6 1.4 1.8 3 3.3 3.8 1 .5 1.8.8 2.9 1 .5.1 1 0 1.5-.3.5-.3 1.1-1 1.3-1.5.2-.4.2-.7.1-.8Z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* NAVEGACIÓN */}
        <div>
          <h4 className="footer__title">Navegación</h4>
          <ul>
            <li>
              <a href="/inicio" onClick={(e) => navigateSmart(["/inicio", "/"], null, e)}>
                Inicio
              </a>
            </li>
            <li>
              <a href="/procedimientos" onClick={(e) => navigateSmart(["/procedimientos", "/procedures"], null, e)}>
                Procedimientos
              </a>
            </li>
            <li>
              {/* intentamos /galeria primero, si tu App usa /gallery se captura también */}
              <a href="/galeria" onClick={(e) => navigateSmart(["/galeria", "/gallery"], "galeria", e)}>
                Galería
              </a>
            </li>
            <li>
              {/* intentamos /contacto primero, luego /contact */}
              <a href="/contacto" onClick={(e) => navigateSmart(["/contacto", "/contact"], "contacto", e)}>
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="footer__title">Legal</h4>
          <ul>
            <li>
              <a href="#privacidad" onClick={(e) => { e.preventDefault(); scrollToAnchor("privacidad"); }}>
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#terminos" onClick={(e) => { e.preventDefault(); scrollToAnchor("terminos"); }}>
                Términos de Servicio
              </a>
            </li>
          </ul>
        </div>

        {/* UBICACIÓN */}
        <div>
          <h4 className="footer__title">Ubicación</h4>
          <address className="footer__address">
            Av. Principal 123 y Calle Secundaria<br />
            Quito, Ecuador<br /><br />
            <a href="mailto:info@ecudoraesthetics.com">info@ecuadoraesthetics.com</a><br />
            <a href="tel:+593991234567">+593 99 123 4567</a>
          </address>
        </div>
      </div>

      <div className="container">
        <hr className="divider" />
        <div className="footer__bottom">
          <small>© 2025 Ecuador Aesthetics. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}
