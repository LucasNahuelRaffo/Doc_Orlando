"use client";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Stethoscope,
  AlertCircle,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { countries } from "../data/countries";

// Imágenes (no tocar)
import iconLocation from "../img/Asset 12.png";
import iconPhone from "../img/Asset 9.png";
import iconEmail from "../img/Asset 10.png";

export default function Contact() {
  const rootRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Animaciones de aparición
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const els = Array.from(root.querySelectorAll(".msf-anim"));
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-inview");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="section contact" style={{ paddingTop: "8rem", paddingBottom: isDropdownOpen ? "18rem" : "4rem", transition: "padding-bottom 0.3s ease" }}>
      <div className="container">
        <header
          className="msf-anim msf-up"
          style={{ textAlign: "center", marginBottom: "1.15rem" }}
        >
          <br></br>
          <h2 className="h2-contact">Agende su Consulta</h2>
          <p className="lead" style={{ maxWidth: "68ch", margin: "0 auto", marginTop: "0px" }}>
            Estamos listos para responder a sus preguntas y ayudarle a dar el
            siguiente paso. Complete el formulario para agendar su cita.
          </p>
        </header>

        <div className="contact__grid">
          {/* LEFT: Multi-step form */}
          <div
            className="contact__card msf-anim msf-left"
            style={{
              background: "var(--surface-1, var(--onix-quirurgico, #171F21))",
              border: "1px solid var(--divider, rgba(255,255,255,.06))",
              borderRadius: "16px",
              padding: "1.25rem",
              boxShadow: "var(--shadow, 0 8px 30px rgba(0,0,0,.35))",
            }}
          >
            <MultiStepForm onDropdownToggle={setIsDropdownOpen} />
          </div>

          {/* RIGHT: CONTACT INFO */}
          <aside
            className="contact__info msf-anim msf-right"
            style={{
              background: "var(--surface-1, var(--onix-quirurgico, #171F21))",
              border: "1px solid var(--divider, rgba(255,255,255,.06))",
              borderRadius: "12px",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h3 className="h3" style={{ margin: 0 }}>
              Información de Contacto
            </h3>

            <div
              className="contact__item"
              style={{ display: "flex", gap: ".75rem", alignItems: "flex-start" }}
            >
              <div className="contact__icon" aria-hidden>
                <img
                  src={iconLocation}
                  alt=""
                  aria-hidden="true"
                  style={{ width: 36, height: 36, objectFit: "contain", display: "block", marginLeft: 1 }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <strong>Dirección</strong>
                <div className="muted" style={{ marginTop: ".25rem" }}>
                  Alemania y Av. Eloy Alfaro. Edificio SOLEMNI . Consultorio 402.
                </div>
              </div>
            </div>

            <div
              className="contact__item"
              style={{ display: "flex", gap: ".75rem", alignItems: "flex-start" }}
            >
              <div className="contact__icon" aria-hidden>
                <img
                  src={iconPhone}
                  alt=""
                  aria-hidden="true"
                  style={{ width: 36, height: 33, objectFit: "contain", display: "block", }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <strong>Teléfono</strong>
                <div className="muted" style={{ marginTop: ".25rem" }}>
                  <a href="tel:+593991234567">+0987433813</a>
                </div>
              </div>
            </div>

            <div
              className="contact__item"
              style={{ display: "flex", gap: ".75rem", alignItems: "flex-start" }}
            >
              <div className="contact__icon" aria-hidden>
                <img
                  src={iconEmail}
                  alt=""
                  aria-hidden="true"
                  style={{ width: 36, height: 36, objectFit: "contain", display: "block", marginLeft: 3.7 }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <strong>Email</strong>
                <div className="muted" style={{ marginTop: ".25rem" }}>
                  <a href="mailto:info@ecuadoraesthetics.com">orlando.cplastica@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="contact__map" style={{ borderRadius: "10px", overflow: "hidden", marginTop: "0.5rem" }}>
              <iframe
                title="Ubicación Consultorio"
                width="100%"
                height="200"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?q=Alemania%20y%20Av.%20Eloy%20Alfaro%20Edificio%20SOLEMNI&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{ display: "block", border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------
   MultiStepForm (8 pasos + pago + calendly)
--------------------------- */
function MultiStepForm({ onDropdownToggle }) {
  const TOTAL_STEPS = 8;

  const API_BASE_URL = (
    process.env.REACT_APP_API_BASE_URL ||
    "https://doc-orlando.vercel.app"
  ).replace(/\/$/, "");

  const CALENDLY_URL =
    process.env.REACT_APP_CALENDLY_URL ||
    "https://calendly.com/lucasnraffo/valoracion-cirugia-plastica-30-min?hide_gdpr_banner=1&primary_color=0ea5e9&background_color=171f21&text_color=f8fafc";

  const stepSubtitles = {
    1: "Datos de contacto",
    2: "Datos personales clave",
    3: "Antecedentes medicos",
    4: "Salud general y habitos",
    5: "Objetivo estetico",
    6: "Agenda (Calendly)",
    7: "Pago y reserva",
    8: "Confirmacion final",
  };

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [banner, setBanner] = useState(null); // mensaje global de error
  const [touched, setTouched] = useState({}); // para resaltar en rojo
  const [calendlyFailed, setCalendlyFailed] = useState(false);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    codigoArea: "+593",
    telefono: "",
    procedimiento: "",
    procedimientoOtro: "",
    ciudad: "",
    edad: "",
    grupoSanguineo: "",
    aceptaTransfusion: "",
    embarazosCesareas: "",
    embarazosCesareasDetalle: "",
    cirugiasPrevias: "",
    cirugiasPreviasDetalle: "",
    enfermedadesRelevantes: "",
    alergias: "",
    tabaquismo: "",
    actividadFisica: "",
    alcohol: "",
    areasMejorar: "",
    prioridadPrincipal: "",
    interesLipotransferencia: "",
    mensajeAdicional: "",
    calendlyConfirm: false,
    // campos legacy para compatibilidad
    fechaCita: "",
    horaCita: "",
    cirugiasAnteriores: "",
    condicionMedica: "",
    condicionMedicaTipo: "",
  });
  const setField = (k, v) => setFormData((p) => ({ ...p, [k]: v }));
  const setFields = (payload) => setFormData((p) => ({ ...p, ...payload }));
  const formTopRef = useRef(null);
  const calendlyContainerRef = useRef(null);
  const calendlyInitialized = useRef(false); // Flag para evitar múltiples inicializaciones

  // Stripe
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  const procedimientos = [
    {
      group: "CABEZA Y CUELLO",
      items: [
        "Rinoseptoplastia ultrasónica",
        "Blefaroplastia",
        "Bichectomía",
        "Liposucción de papada",
        "Otoplastia",
        "Lifting facial/cuello",
        "Estética facial",
      ],
    },
    {
      group: "TÓRAX Y ABDOMEN",
      items: [
        "Mamoplastias",
        "Abdominoplastia",
        "Mini-abdominoplastia",
        "Ginecomastia",
        "Glándulas mamarias accesorias",
      ],
    },
    {
      group: "CONTORNO CORPORAL",
      items: [
        "Lipoescultura corporal",
        "Gluteoplastia",
        "Aumento de pantorrillas",
        "Lifting de brazos (braquioplastia)",
        "Lifting de muslos (cruroplastia)",
      ],
    },
    {
      group: "CIRUGÍA ESTÉTICA GENITAL",
      items: [
        "Liposucción del monte de Venus",
        "Labioplastia",
        "Reconstrucción del himen",
      ],
    },
    {
      group: "OTROS",
      items: [
        "Toxina botulínica",
        "Ácido hialurónico",
        "Tratamiento con láser CO₂ fraccionado",
        "Corrección de cicatrices",
        "Tratamiento de cicatrices antiestéticas",
        "Extirpación de lunares",
        "Extirpación de tumores cutáneos",
        "Extirpación de lipomas",
        "Otro",
      ],
    },
  ];
  const gruposSanguineos = [
    {
      group: "GRUPO SANGUINEO",
      items: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "No se / Otro"],
    },
  ];

  // Helpers & validaciones
  const digits = (s) => (s || "").replace(/\D/g, "");
  const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || "");
  const telOk = (area, tel) =>
    !!area && /^\d{7,10}$/.test((tel || "").replace(/\D/g, ""));
  const ageOk = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 && n < 120;
  };
  const required = (v) => {
    if (typeof v === "boolean") return v;
    if (typeof v === "string") return !!v.trim();
    return !!v;
  };

  const step1Valid =
    formData.nombreCompleto.trim() &&
    emailOk(formData.email) &&
    telOk(formData.codigoArea, formData.telefono) &&
    formData.procedimiento &&
    (formData.procedimiento !== "Otro" || formData.procedimientoOtro.trim());

  const step2Valid =
    required(formData.ciudad) &&
    ageOk(formData.edad) &&
    required(formData.grupoSanguineo) &&
    (formData.aceptaTransfusion === "Si" || formData.aceptaTransfusion === "No");

  const step3Valid =
    (formData.embarazosCesareas === "Si" || formData.embarazosCesareas === "No" || formData.embarazosCesareas === "No aplica") &&
    (formData.embarazosCesareas !== "Si" || required(formData.embarazosCesareasDetalle)) &&
    (formData.cirugiasPrevias === "Si" || formData.cirugiasPrevias === "No") &&
    (formData.cirugiasPrevias !== "Si" || required(formData.cirugiasPreviasDetalle)) &&
    required(formData.enfermedadesRelevantes);

  const step4Valid =
    required(formData.alergias) &&
    required(formData.tabaquismo) &&
    required(formData.actividadFisica) &&
    required(formData.alcohol);

  const step5Valid =
    required(formData.areasMejorar) &&
    required(formData.prioridadPrincipal) &&
    (formData.interesLipotransferencia === "Si" || formData.interesLipotransferencia === "No");

  const step6Valid = !!formData.calendlyConfirm;


  const markStepTouched = (n) => {
    if (n === 1) {
      setTouched((t) => ({
        ...t,
        nombreCompleto: true,
        email: true,
        codigoArea: true,
        telefono: true,
        procedimiento: true,
        procedimientoOtro: formData.procedimiento === "Otro",
      }));
    } else if (n === 2) {
      setTouched((t) => ({
        ...t,
        ciudad: true,
        edad: true,
        grupoSanguineo: true,
        aceptaTransfusion: true,
      }));
    } else if (n === 3) {
      setTouched((t) => ({
        ...t,
        embarazosCesareas: true,
        embarazosCesareasDetalle: formData.embarazosCesareas === "Si",
        cirugiasPrevias: true,
        cirugiasPreviasDetalle: formData.cirugiasPrevias === "Si",
        enfermedadesRelevantes: true,
      }));
    } else if (n === 4) {
      setTouched((t) => ({
        ...t,
        alergias: true,
        tabaquismo: true,
        actividadFisica: true,
        alcohol: true,
      }));
    } else if (n === 5) {
      setTouched((t) => ({
        ...t,
        areasMejorar: true,
        prioridadPrincipal: true,
        interesLipotransferencia: true,
      }));
    } else if (n === 6) {
      setTouched((t) => ({
        ...t,
        calendlyConfirm: true,
      }));
    }
  };

  const scrollToFormTop = () => {
    const el = formTopRef.current;
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const next = () => {
    setBanner(null);
    if (step === 1 && !step1Valid) {
      markStepTouched(1);
      setBanner("Revisa los campos resaltados para continuar.");
      return;
    }
    if (step === 2 && !step2Valid) {
      markStepTouched(2);
      setBanner("Completa los datos personales clave.");
      return;
    }
    if (step === 3 && !step3Valid) {
      markStepTouched(3);
      setBanner("Agrega los antecedentes solicitados para continuar.");
      return;
    }
    if (step === 4 && !step4Valid) {
      markStepTouched(4);
      setBanner("Completa salud general y habitos.");
      return;
    }
    if (step === 5 && !step5Valid) {
      markStepTouched(5);
      setBanner("Define tu objetivo estetico antes de seguir.");
      return;
    }
    if (step === 6 && !step6Valid) {
      markStepTouched(6);
      setBanner("Confirma que seleccionaste un horario en Calendly.");
      return;
    }

    // Crear PaymentIntent antes del paso de pago
    if (step === 6) {
      if (clientSecret) {
        setStep(7);
        scrollToFormTop();
        return;
      }
      fetch(`${API_BASE_URL}/api/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 10000 }),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (!res.ok || !data.clientSecret) {
            throw new Error(data.message || data.error || "No se pudo iniciar el pago.");
          }
          return data;
        })
        .then((data) => {
          setClientSecret(data.clientSecret);
          setStep(7);
          scrollToFormTop();
        })
        .catch((err) => {
          console.error(err);
          setBanner(err?.message || "Error al iniciar el pago. Intente nuevamente.");
        });
      return;
    }

    setStep(Math.min(step + 1, 7));
    scrollToFormTop();
  };

  const back = () => {
    setBanner(null);
    setStep((s) => Math.max(1, s - 1));
  };

  // Esta función se llama CUANDO Stripe confirma el pago exitoso
  const handlePaymentSuccess = async (paymentIntent) => {
    setBanner(null);

    try {
      const API_URL = `${API_BASE_URL}/api/submit`;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          paymentIntentId: paymentIntent.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Error en la respuesta del servidor");
      }

      setStep(8);
      setSubmitted(true);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setBanner(`Pago exitoso, pero hubo un error al guardar la cita: ${error.message}. Contactenos.`);
    }
  };

  const progressPct = Math.round(((submitted ? TOTAL_STEPS : step) / TOTAL_STEPS) * 100);

  useEffect(() => {
    if (!submitted) return;
    const payload = {
      procedimiento: formData.procedimiento,
      procedimientoOtro: formData.procedimientoOtro,
    };
    try {
      window.localStorage.setItem("ea_video_procedimiento", JSON.stringify(payload));
    } catch (error) {
      console.error("No se pudo guardar el procedimiento para videos:", error);
    }
  }, [submitted, formData.procedimiento, formData.procedimientoOtro]);

  useEffect(() => {
    if (step !== 6) {
      // Resetear el flag cuando sales del paso 6
      calendlyInitialized.current = false;
      return;
    }

    // Si ya fue inicializado, no hacer nada
    if (calendlyInitialized.current) {
      console.log("Calendly ya fue inicializado, omitiendo...");
      return;
    }

    setCalendlyFailed(false);

    const initCalendly = () => {
      try {
        if (!calendlyContainerRef.current) {
          throw new Error("El contenedor de Calendly no está disponible");
        }

        // Limpiar el contenedor
        calendlyContainerRef.current.innerHTML = "";

        console.log("Inicializando Calendly...");

        // Verificar si el script de Calendly está cargado
        if (window.Calendly && window.Calendly.initInlineWidget) {
          // Inicializar el widget manualmente
          window.Calendly.initInlineWidget({
            url: CALENDLY_URL,
            parentElement: calendlyContainerRef.current,
          });
          calendlyInitialized.current = true; // Marcar como inicializado
          console.log("Calendly inicializado correctamente");
        } else {
          console.error("El script de Calendly no está disponible");
          setCalendlyFailed(true);
          setBanner("El script de Calendly no se cargó correctamente. Recarga la página.");
        }
      } catch (err) {
        console.error("Calendly init error:", err);
        setCalendlyFailed(true);
        setBanner("No pudimos cargar Calendly. Reintenta o desactiva bloqueadores de contenido.");
      }
    };

    initCalendly();

    // Guardar la referencia del contenedor para la función de cleanup
    const container = calendlyContainerRef.current;

    // Cleanup: limpiar el widget cuando el componente se desmonta o cambia de paso
    return () => {
      if (container) {
        container.innerHTML = "";
      }
      calendlyInitialized.current = false; // Resetear el flag
    };
  }, [step, CALENDLY_URL]);

  if (submitted) {
    const resumenItems = [
      {
        label: "Procedimiento",
        value:
          formData.procedimiento === "Otro"
            ? formData.procedimientoOtro || "Otro"
            : formData.procedimiento,
      },
      { label: "Ciudad", value: formData.ciudad || "No indicado" },
      { label: "Objetivo", value: formData.prioridadPrincipal || formData.areasMejorar },
      { label: "Agenda", value: "Horario elegido en Calendly" },
    ];

    return (
      <div
        style={{
          padding: "4rem 1rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          animation: "fadeIn 0.8s ease-out",
        }}
      >
        <div className="msf__header" style={{ marginBottom: "1rem" }}>
          <div style={{ fontWeight: 700 }}>Paso 8 de {TOTAL_STEPS}</div>
          <div className="muted">Confirmacion final</div>
        </div>

        <div
          className="msf-submitted__card"
          style={{
            width: "100%",
            maxWidth: "520px",
            animation: "msf-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
            background: "linear-gradient(145deg, var(--surface-1), var(--surface-2))",
            padding: "3rem 2rem",
            borderRadius: "24px",
            border: "1px solid var(--divider)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            marginBottom: "2rem",
          }}
        >
          <div
            className="msf-submitted__icon"
            style={{
              marginBottom: "1.5rem",
              background: "rgba(22, 163, 74, 0.1)",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto"
            }}
          >
            <CheckCircle size={40} color="#16a34a" strokeWidth={2.5} />
          </div>
          <h3 style={{ color: "white", marginBottom: "1rem", fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Pago Exitoso
          </h3>
          <p className="muted" style={{ color: "white", margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Su cita ha sido agendada correctamente. <br />
            Hemos enviado los detalles a su correo.
          </p>
          <div
            style={{
              marginTop: "1.25rem",
              border: "1px solid var(--divider)",
              borderRadius: "12px",
              padding: "1rem",
              background: "rgba(255,255,255,0.03)",
              textAlign: "left",
            }}
          >
            <div style={{fontWeight: 700, marginBottom: ".5rem", color:"white",}}>Resumen breve</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: ".35rem" }}>
              {resumenItems.map((item) => (
                <li key={item.label} className="muted">
                  <strong>{item.label}:</strong> {item.value || "Pendiente"}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
            <Link
              to="/videos-explicativos"
              state={{
                procedimiento: formData.procedimiento,
                procedimientoOtro: formData.procedimientoOtro,
              }}
              className="boton-formulario"
            >
              Ver videos explicativos
            </Link>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div ref={formTopRef} className="msf" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="msf__header">
        <div style={{ fontWeight: 700 }}>Paso {step} de {TOTAL_STEPS}</div>
        <div className="muted">{stepSubtitles[step]}</div>
      </div>

      <div className="msf__progress">
        <div className="msf__progress-bar" style={{ width: `${progressPct}%` }} />
      </div>

      {banner && (
        <div className="msf-banner">
          <AlertCircle className="msf-icon" size={18} />
          <span>{banner}</span>
        </div>
      )}

      <div className="msf-card msf-anim msf-up is-inview">
        {/* PASO 1 */}
        {step === 1 && (
          <div
            className="msf__body"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Nombre */}
            <div className="form-group">
              <label className="msf-label">Nombre Completo *</label>
              <div
                className={`msf-field ${touched.nombreCompleto && !formData.nombreCompleto.trim()
                  ? "is-invalid"
                  : ""
                  }`}
              >
                <User className="msf-icon" aria-hidden />
                <input
                  className="msf-input"
                  value={formData.nombreCompleto}
                  onChange={(e) => setField("nombreCompleto", e.target.value)}
                  onBlur={() =>
                    setTouched((t) => ({ ...t, nombreCompleto: true }))
                  }
                  placeholder="Juan Perez"
                />
              </div>
              {touched.nombreCompleto && !formData.nombreCompleto.trim() && (
                <div className="msf-error">Este campo es obligatorio.</div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="msf-label">Email *</label>
              <div
                className={`msf-field ${touched.email && !emailOk(formData.email) ? "is-invalid" : ""
                  }`}
              >
                <Mail className="msf-icon" aria-hidden />
                <input
                  className="msf-input-2"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              {touched.email && !emailOk(formData.email) && (
                <div className="msf-error">Ingresa un email valido.</div>
              )}
            </div>

            {/* Telefono con Banderas */}
            <div className="form-group">
              <label className="msf-label">Teléfono *</label>
              <div className="msf-row">
                <div
                  className="msf-field msf-field--sm"
                  style={{ flex: "0 0 110px", padding: 0, overflow: "visible", zIndex: 10 }}
                >
                  <CountrySelect
                    value={formData.codigoArea}
                    onChange={(val) => setField("codigoArea", val)}
                  />
                </div>
                <div
                  className={`msf-field ${touched.telefono &&
                    !/^\d{7,10}$/.test(digits(formData.telefono))
                    ? "is-invalid"
                    : ""
                    }`}
                  style={{ flex: 1 }}
                >
                  <input
                    className="msf-input"
                    value={formData.telefono}
                    onChange={(e) =>
                      setField("telefono", digits(e.target.value).slice(0, 10))
                    }
                    onBlur={() =>
                      setTouched((t) => ({ ...t, telefono: true }))
                    }
                    placeholder="0991234567"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div className="msf-hint">Selecciona tu país y escribe tu número</div>
              {touched.telefono &&
                !/^\d{7,10}$/.test(digits(formData.telefono)) && (
                  <div className="msf-error">Número telefónico inválido.</div>
                )}
            </div>

            {/* Procedimiento */}
            <div className="form-group">
              <label className="msf-label">Procedimiento de Interés *</label>
              <CustomSelect
                icon={<Stethoscope className="msf-icon" size={18} />}
                options={procedimientos}
                value={formData.procedimiento}
                onChange={(v) => setField("procedimiento", v)}
                placeholder="Selecciona un procedimiento"
                onOpenChange={onDropdownToggle}
              />
              {touched.procedimiento && !formData.procedimiento && (
                <div className="msf-error">Seleccione una opción.</div>
              )}
              {formData.procedimiento === "Otro" && (
                <div style={{ marginTop: 8 }}>
                  <div
                    className={`msf-field ${touched.procedimientoOtro &&
                      !formData.procedimientoOtro.trim()
                      ? "is-invalid"
                      : ""
                      }`}
                  >
                    <input
                      className="msf-input"
                      value={formData.procedimientoOtro}
                      onChange={(e) =>
                        setField("procedimientoOtro", e.target.value)
                      }
                      onBlur={() =>
                        setTouched((t) => ({
                          ...t,
                          procedimientoOtro: true,
                        }))
                      }
                      placeholder="Especifique cuál"
                    />
                  </div>
                  {touched.procedimientoOtro &&
                    !formData.procedimientoOtro.trim() && (
                      <div className="msf-error">
                        Especifique el procedimiento.
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Mensaje */}
            <div className="form-group">
              <label className="msf-label">Mensaje Adicional (opcional)</label>
              <textarea
                className="msf-textarea"
                value={formData.mensajeAdicional}
                onChange={(e) => setField("mensajeAdicional", e.target.value)}
                placeholder="Cuéntenos más sobre su caso..."
              />
            </div>

            <div className="msf-row" style={{ justifyContent: "flex-end" }}>
              <button className="boton-formulario" type="button" onClick={next}>
                Siguiente <ArrowRight style={{ marginLeft: 8 }} />
              </button>
            </div>
          </div>
        )}
        {/* PASO 2 */}
        {step === 2 && (
          <div className="msf__body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="msf-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label className="msf-label">Ciudad *</label>
                <div
                  className={`msf-field ${touched.ciudad && !required(formData.ciudad)
                    ? "is-invalid"
                    : ""
                    }`}
                >
                  <input
                    className="msf-input"
                    value={formData.ciudad}
                    onChange={(e) => setField("ciudad", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, ciudad: true }))}
                    placeholder="Quito, Guayaquil..."
                  />
                </div>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="msf-label">Edad *</label>
                <div
                  className={`msf-field ${touched.edad && !ageOk(formData.edad)
                    ? "is-invalid"
                    : ""
                    }`}
                >
                  <input
                    className="msf-input"
                    value={formData.edad}
                    inputMode="numeric"
                    onChange={(e) => setField("edad", digits(e.target.value).slice(0, 3))}
                    onBlur={() => setTouched((t) => ({ ...t, edad: true }))}
                    placeholder="35"
                  />
                </div>
              </div>
            </div>

            <div className="msf-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label className="msf-label">Grupo sanguineo *</label>
                <CustomSelect
                  icon={<Stethoscope className="msf-icon" size={18} />}
                  options={gruposSanguineos}
                  value={formData.grupoSanguineo}
                  onChange={(v) => setField("grupoSanguineo", v)}
                  placeholder="Seleccione"
                  onOpenChange={onDropdownToggle}
                />
                {touched.grupoSanguineo && !formData.grupoSanguineo && (
                  <div className="msf-error">Selecciona tu grupo sanguineo.</div>
                )}
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="msf-label">Acepta transfusion sanguinea *</label>
                <div className="msf-toggle-group">
                  <button
                    type="button"
                    className={`msf-toggle-btn ${formData.aceptaTransfusion === "Si" ? "is-active" : ""}`}
                    onClick={() => setField("aceptaTransfusion", "Si")}
                  >
                    Si
                  </button>
                  <button
                    type="button"
                    className={`msf-toggle-btn ${formData.aceptaTransfusion === "No" ? "is-active" : ""}`}
                    onClick={() => setField("aceptaTransfusion", "No")}
                  >
                    No
                  </button>
                </div>
                {touched.aceptaTransfusion && !formData.aceptaTransfusion && (
                  <div className="msf-error">Selecciona una opcion.</div>
                )}
              </div>
            </div>

            <div className="msf-row">
              <button className="Boton_anterior" type="button" onClick={back}>
                <ArrowLeft style={{ marginRight: 8 }} /> Anterior
              </button>
              <button className="boton-formulario" type="button" onClick={next}>
                Siguiente <ArrowRight style={{ marginLeft: 8 }} />
              </button>
            </div>
          </div>
        )}

        {/* PASO 3 */}
        {step === 3 && (
          <div className="msf__body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="msf-label">Embarazos / cesareas</label>
              <div className="msf-toggle-group">
                {["Si", "No", "No aplica"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`msf-toggle-btn ${formData.embarazosCesareas === opt ? "is-active" : ""}`}
                    onClick={() =>
                      setFields({
                        embarazosCesareas: opt,
                        embarazosCesareasDetalle: opt === "Si" ? formData.embarazosCesareasDetalle : "",
                      })
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {formData.embarazosCesareas === "Si" && (
                <div style={{ marginTop: "0.75rem" }}>
                  <div
                    className={`msf-field ${touched.embarazosCesareasDetalle && !formData.embarazosCesareasDetalle.trim()
                      ? "is-invalid"
                      : ""
                      }`}
                  >
                    <textarea
                      className="msf-textarea"
                      value={formData.embarazosCesareasDetalle}
                      onChange={(e) =>
                        setField("embarazosCesareasDetalle", e.target.value)
                      }
                      onBlur={() =>
                        setTouched((t) => ({ ...t, embarazosCesareasDetalle: true }))
                      }
                      placeholder="Cuantas, anio, observaciones..."
                    />
                  </div>
                  {touched.embarazosCesareasDetalle && !formData.embarazosCesareasDetalle.trim() && (
                    <div className="msf-error">Completa este detalle.</div>
                  )}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="msf-label">Cirugias previas *</label>
              <div className="msf-toggle-group">
                {["Si", "No"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`msf-toggle-btn ${formData.cirugiasPrevias === opt ? "is-active" : ""}`}
                    onClick={() =>
                      setFields({
                        cirugiasPrevias: opt,
                        cirugiasPreviasDetalle: opt === "Si" ? formData.cirugiasPreviasDetalle : "",
                        cirugiasAnteriores: opt,
                      })
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {formData.cirugiasPrevias === "Si" && (
                <div style={{ marginTop: "0.75rem" }}>
                  <div
                    className={`msf-field ${touched.cirugiasPreviasDetalle && !formData.cirugiasPreviasDetalle.trim()
                      ? "is-invalid"
                      : ""
                      }`}
                  >
                    <textarea
                      className="msf-textarea"
                      value={formData.cirugiasPreviasDetalle}
                      onChange={(e) => setField("cirugiasPreviasDetalle", e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, cirugiasPreviasDetalle: true }))}
                      placeholder="Tipo de cirugia, anio, observaciones"
                    />
                  </div>
                  {touched.cirugiasPreviasDetalle && !formData.cirugiasPreviasDetalle.trim() && (
                    <div className="msf-error">Completa este detalle.</div>
                  )}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="msf-label">Enfermedades personales o familiares relevantes *</label>
              <textarea
                className={`msf-textarea ${touched.enfermedadesRelevantes && !formData.enfermedadesRelevantes.trim() ? "is-invalid" : ""}`}
                value={formData.enfermedadesRelevantes}
                onChange={(e) => {
                  const value = e.target.value;
                  const clean = value.trim().toLowerCase();
                  setFields({
                    enfermedadesRelevantes: value,
                    condicionMedica: clean && clean !== "ninguna" ? "Si" : "No",
                    condicionMedicaTipo: value,
                  });
                }}
                onBlur={() => setTouched((t) => ({ ...t, enfermedadesRelevantes: true }))}
                placeholder="Ej: hipertension, diabetes, antecedentes familiares. Escriba 'Ninguna' si no aplica."
              />
              {touched.enfermedadesRelevantes && !formData.enfermedadesRelevantes.trim() && (
                <div className="msf-error">Completa esta respuesta.</div>
              )}
            </div>

            <div className="msf-row">
              <button className="Boton_anterior" type="button" onClick={back}>
                <ArrowLeft style={{ marginRight: 8 }} /> Anterior
              </button>
              <button className="boton-formulario" type="button" onClick={next}>
                Siguiente <ArrowRight style={{ marginLeft: 8 }} />
              </button>
            </div>
          </div>
        )}

        {/* PASO 4 */}
        {step === 4 && (
          <div className="msf__body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="msf-label">Alergias *</label>
              <textarea
                className={`msf-textarea ${touched.alergias && !formData.alergias.trim() ? "is-invalid" : ""}`}
                value={formData.alergias}
                onChange={(e) => setFields({ alergias: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, alergias: true }))}
                placeholder="Medicamentos, alimentos, latex... o indique 'Ninguna'."
              />
              {touched.alergias && !formData.alergias.trim() && <div className="msf-error">Completa este campo.</div>}
            </div>

            <div className="form-group">
              <label className="msf-label">Tabaquismo *</label>
              <div className="msf-toggle-group">
                {["No fumo", "Ocasional", "Diario"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`msf-toggle-btn ${formData.tabaquismo === opt ? "is-active" : ""}`}
                    onClick={() => setField("tabaquismo", opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {touched.tabaquismo && !formData.tabaquismo && <div className="msf-error">Selecciona una opcion.</div>}
            </div>

            <div className="form-group">
              <label className="msf-label">Actividad fisica *</label>
              <div className="msf-toggle-group">
                {["Sedentario", "1-2 veces/sem", "3-5 veces/sem", "Atleta"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`msf-toggle-btn ${formData.actividadFisica === opt ? "is-active" : ""}`}
                    onClick={() => setField("actividadFisica", opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {touched.actividadFisica && !formData.actividadFisica && <div className="msf-error">Selecciona una opcion.</div>}
            </div>

            <div className="form-group">
              <label className="msf-label">Alcohol *</label>
              <div className="msf-toggle-group">
                {["No consumo", "Social", "Frecuente"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`msf-toggle-btn ${formData.alcohol === opt ? "is-active" : ""}`}
                    onClick={() => setField("alcohol", opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {touched.alcohol && !formData.alcohol && <div className="msf-error">Selecciona una opcion.</div>}
            </div>

            <div className="msf-row">
              <button className="Boton_anterior" type="button" onClick={back}>
                <ArrowLeft style={{ marginRight: 8 }} /> Anterior
              </button>
              <button className="boton-formulario" type="button" onClick={next}>
                Siguiente <ArrowRight style={{ marginLeft: 8 }} />
              </button>
            </div>
          </div>
        )}

        {/* PASO 5 */}
        {step === 5 && (
          <div className="msf__body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="msf-label">Areas a mejorar *</label>
              <textarea
                className={`msf-textarea ${touched.areasMejorar && !formData.areasMejorar.trim() ? "is-invalid" : ""}`}
                value={formData.areasMejorar}
                onChange={(e) => setField("areasMejorar", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, areasMejorar: true }))}
                placeholder="Ej: abdomen, contorno, menton, piernas..."
              />
              {touched.areasMejorar && !formData.areasMejorar.trim() && <div className="msf-error">Completa este campo.</div>}
            </div>

            <div className="form-group">
              <label className="msf-label">Prioridad principal *</label>
              <div
                className={`msf-field ${touched.prioridadPrincipal && !formData.prioridadPrincipal.trim()
                  ? "is-invalid"
                  : ""
                  }`}
              >
                <input
                  className="msf-input"
                  value={formData.prioridadPrincipal}
                  onChange={(e) => setField("prioridadPrincipal", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, prioridadPrincipal: true }))}
                  placeholder="Ej: definir cintura, mejorar respiracion..."
                />
              </div>
              {touched.prioridadPrincipal && !formData.prioridadPrincipal.trim() && <div className="msf-error">Comparte tu prioridad.</div>}
            </div>

            <div className="form-group">
              <label className="msf-label">Interes en lipotransferencia *</label>
              <div className="msf-toggle-group">
                {["Si", "No"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`msf-toggle-btn ${formData.interesLipotransferencia === opt ? "is-active" : ""}`}
                    onClick={() => setField("interesLipotransferencia", opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {touched.interesLipotransferencia && !formData.interesLipotransferencia && <div className="msf-error">Selecciona una opcion.</div>}
            </div>

            <div className="msf-row">
              <button className="Boton_anterior" type="button" onClick={back}>
                <ArrowLeft style={{ marginRight: 8 }} /> Anterior
              </button>
              <button className="boton-formulario" type="button" onClick={next}>
                Siguiente <ArrowRight style={{ marginLeft: 8 }} />
              </button>
            </div>
          </div>
        )}

        {/* PASO 6: Calendly */}
        {step === 6 && (
          <div className="msf__body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Calendar className="msf-icon" size={18} style={{ position: "static", transform: "none" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700 }}>Elige dia y horario</div>
                <div className="muted">Datos prellenados con tu nombre, email y telefono. Sin preguntas medicas.</div>
              </div>
            </div>

            <div
              ref={calendlyContainerRef}
              style={{
                height: "500px",
                width: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid var(--divider)",
              }}
            />
            {calendlyFailed && (
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div className="msf-banner">
                  <AlertCircle className="msf-icon" size={18} />
                  <span>No pudimos cargar el widget de Calendly</span>
                </div>
                <div style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  border: "1px solid var(--divider)",
                  textAlign: "center"
                }}>
                  <p className="muted" style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                    Puedes intentar recargar el widget o agendar directamente en Calendly:
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="boton-formulario"
                      onClick={() => {
                        setCalendlyFailed(false);
                        // Forzar recarga eliminando el script
                        const existingScript = document.getElementById("calendly-widget-script");
                        if (existingScript) {
                          existingScript.remove();
                        }
                        // El useEffect se encargará de reinicializar
                      }}
                      style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}
                    >
                      🔄 Reintentar carga
                    </button>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="boton-formulario"
                      style={{
                        fontSize: "0.9rem",
                        padding: "0.5rem 1rem",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}
                    >
                      📅 Abrir Calendly
                    </a>
                  </div>
                  <p className="muted" style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
                    Después de agendar, marca la casilla de confirmación abajo para continuar.
                  </p>
                </div>
              </div>
            )}

            <div className="form-group" style={{ textAlign: "left" }}>
              <label className="msf-label">Confirmacion *</label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.calendlyConfirm}
                  onChange={(e) => setField("calendlyConfirm", e.target.checked)}
                  onBlur={() => setTouched((t) => ({ ...t, calendlyConfirm: true }))}
                  style={{ width: 18, height: 18 }}
                />
                <span className="muted">Ya elegi un horario en Calendly y quiero continuar al pago.</span>
              </label>
              {touched.calendlyConfirm && !formData.calendlyConfirm && (
                <div className="msf-error">Marca esta casilla para continuar.</div>
              )}
            </div>

            <div className="msf-row">
              <button className="Boton_anterior" type="button" onClick={back}>
                <ArrowLeft style={{ marginRight: 8 }} /> Anterior
              </button>
              <button className="boton-formulario" type="button" onClick={next}>
                Ir a pago <ArrowRight style={{ marginLeft: 8 }} />
              </button>
            </div>
          </div>
        )}

        {/* PASO 7: Pago */}
        {step === 7 && (
          <div
            className="msf__body"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ marginBottom: ".5rem" }}>
              <h3 style={{ margin: 0 }}>Pago de consulta / reserva</h3>
              <p className="muted" style={{ fontSize: ".9rem" }}>
                Confirma tu cita abonando $100. Recibiras un correo con el horario elegido.
              </p>
            </div>

            <div
              style={{
                border: "1px solid var(--divider)",
                borderRadius: "12px",
                padding: "1rem",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: ".35rem" }}>Resumen breve</div>
              <div className="muted" style={{ display: "grid", gap: ".35rem" }}>
                <div><strong>Nombre:</strong> {formData.nombreCompleto || "Pendiente"}</div>
                <div>
                  <strong>Procedimiento:</strong>{" "}
                  {formData.procedimiento === "Otro"
                    ? formData.procedimientoOtro || "Otro"
                    : formData.procedimiento || "Pendiente"}
                </div>
                <div><strong>Ciudad:</strong> {formData.ciudad || "Pendiente"}</div>
                <div><strong>Objetivo:</strong> {formData.prioridadPrincipal || formData.areasMejorar || "Pendiente"}</div>
                <div><strong>Horario:</strong> Elegido en Calendly</div>
              </div>
            </div>

            {clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#0ea5e9",
                      colorBackground: "#1e293b",
                      colorText: "#f8fafc",
                    },
                  },
                }}
              >
                <CheckoutForm onSuccess={handlePaymentSuccess} />
              </Elements>
            ) : (
              <div className="msf-banner">
                <AlertCircle className="msf-icon" size={18} />
                <span>Preparando el pago...</span>
              </div>
            )}

            <div className="msf-row" style={{ marginTop: "1rem" }}>
              <button className="Boton_anterior" type="button" onClick={back}>
                <ArrowLeft style={{ marginRight: 8 }} /> Anterior
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


/* ---------------------------
   CustomSelect (Dropdown)
--------------------------- */
function CustomSelect({ icon, options, value, onChange, placeholder, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onOpenChange) onOpenChange(newState);
  };

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
  };

  const displayValue = value || placeholder;

  return (
    <div className="proc-select" ref={wrapperRef}>
      <div
        className={`msf-field proc-select__btn ${isOpen ? "is-open" : ""} `}
        onClick={toggle}
      >
        {icon && <span className="proc-select__icon">{icon}</span>}
        <span className={`proc-select__value ${!value ? "is-placeholder" : ""}`}>
          {displayValue}
        </span>
        <ChevronDown
          size={18}
          className={`msf-icon proc-select__caret ${isOpen ? "is-open" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="proc-select__dropdown">
          <ul className="proc-select__menu">
            {options.map((grp, i) => (
              <React.Fragment key={i}>
                <li className="proc-select__group-title">{grp.group}</li>
                {grp.items.map((item) => (
                  <li
                    key={item}
                    className={`proc-select__option ${item === value ? "is-active" : ""} `}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="proc-select__label">{item}</span>
                    {item === value && (
                      <CheckCircle size={14} className="msf-icon proc-select__check" />
                    )}
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CountrySelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCountry = countries.find((c) => c.code === value) || countries[0];

  return (
    <div className="country-select" ref={wrapperRef} style={{ position: "relative", height: "100%" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          padding: "0 0.75rem",
          cursor: "pointer",
          background: "transparent",
          borderRight: "1px solid var(--divider)",
        }}
      >
        <span style={{ fontSize: "1.2rem", marginRight: "0.25rem" }}>{selectedCountry.flag}</span>
        <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{selectedCountry.code}</span>
        <ChevronDown size={14} className="msf-icon" style={{ marginLeft: "auto", opacity: 0.5 }} />
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "280px",
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "#1C2527",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            zIndex: 10000,
            boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
            marginTop: "4px",
            display: "block",
            opacity: 1,
            backdropFilter: "none",
          }}
        >
          {countries.map((c) => (
            <div
              key={c.name}
              onClick={() => {
                onChange(c.code);
                setIsOpen(false);
              }}
              style={{
                backgroundColor: "#1C2527",
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{c.flag}</span>
              <span style={{ flex: 1, fontSize: "0.9rem" }}>{c.name}</span>
              <span style={{ fontSize: "0.85rem", opacity: 0.6 }}>{c.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
