"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

// Asegúrate de tener estas imágenes en src/img/
// src/img/location.png, src/img/phone.png, src/img/email.png
import iconLocation from "../img/Asset 12.png";
import iconPhone from "../img/Asset 9.png";
import iconEmail from "../img/Asset 10.png";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [procedure, setProcedure] = useState("");
  const [date, setDate] = useState(null);
  const [hadSurgery, setHadSurgery] = useState("no");
  const [medicalCond, setMedicalCond] = useState("");
  const [message, setMessage] = useState("");

  const proceduresList = [
    "" ,
    "Rinoplastia",
    "Aumento de Mamas",
    "Liposucción",
    "Lifting Facial",
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name, email, tel, procedure, date, hadSurgery, medicalCond, message
    };
    console.log("Enviar form (aquí integra backend):", payload);
    // Aquí pondrías fetch/axios al endpoint para almacenar la cita
    alert("Formulario enviado (ver consola).");
  }

  function handleReset() {
    setName(""); setEmail(""); setTel(""); setProcedure(""); setDate(null);
    setHadSurgery("no"); setMedicalCond(""); setMessage("");
  }

  return (
    <section className="section contact">
      <div className="container">
        <header style={{ textAlign: "center", marginBottom: "1.15rem" }}>
          <h2 className="h2">Agende su Consulta</h2>
          <p className="lead" style={{ maxWidth: "68ch", margin: "0 auto" }}>
            Estamos listos para responder a sus preguntas y ayudarle a dar el siguiente paso. Complete el formulario para agendar su cita o utilice nuestros datos de contacto directo.
          </p>
        </header>

        <div className="contact__grid">
          {/* LEFT: FORM */}
          <form className="contact__card" onSubmit={handleSubmit}>
            <h3 className="h3" style={{ marginBottom: ".6rem" }}>Información del Paciente</h3>

            <label className="form-group">
              <small>Nombre Completo</small>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Su nombre" />
            </label>

            <div className="form-row">
              <label className="form-group">
                <small>Email</small>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="su@email.com" />
              </label>

              <label className="form-group">
                <small>Teléfono</small>
                <input type="tel" value={tel} onChange={(e)=>setTel(e.target.value)} placeholder="Su número de teléfono" />
              </label>
            </div>

            <label className="form-group">
              <small>Procedimiento de Interés</small>
              <select value={procedure} onChange={(e)=>setProcedure(e.target.value)}>
                {proceduresList.map(p => <option key={p} value={p}>{p === "" ? "Seleccione un procedimiento" : p}</option>)}
              </select>
            </label>

            <label className="form-group">
              <small>Fecha Deseada para la Cita</small>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                locale={es}
                placeholderText="Seleccione una fecha"
                dateFormat="dd/MM/yyyy"
                className="input date-picker-input"
                calendarClassName="react-datepicker-dark"
                popperPlacement="auto"
                minDate={new Date()}
              />
            </label>

            <fieldset className="form-group radio-group" aria-label="cirugías previas">
              <small>¿Ha tenido cirugías plásticas anteriormente?</small>
              <div className="radios">
                <label><input type="radio" name="hadSurgery" value="si" checked={hadSurgery==="si"} onChange={()=>setHadSurgery("si")} /> Si</label>
                <label><input type="radio" name="hadSurgery" value="no" checked={hadSurgery==="no"} onChange={()=>setHadSurgery("no")} /> No</label>
              </div>
            </fieldset>

            <label className="form-group">
              <small>¿Padece de alguna condición médica importante?</small>
              <select value={medicalCond} onChange={(e)=>setMedicalCond(e.target.value)}>
                <option value="">Seleccione una condición (opcional)</option>
                <option value="diabetes">Diabetes</option>
                <option value="hipertension">Hipertensión</option>
                <option value="asma">Asma</option>
                <option value="cardiaca">Enfermedad cardíaca</option>
                <option value="otra">Otra</option>
              </select>
            </label>

            <label className="form-group">
              <small>Mensaje Adicional</small>
              <textarea rows="4" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Escriba aquí cualquier otra información relevante..."></textarea>
            </label>

            <div className="form-actions">
              <button type="button" className="btn btn--ghost" onClick={handleReset}>Limpiar</button>
              <button type="submit" className="btn btn--primary">Enviar Mensaje</button>
            </div>
          </form>

          {/* RIGHT: CONTACT INFO + MAP */}
          <aside className="contact__info">
            <h3 className="h3">Información de Contacto</h3>

            <div className="contact__item">
              <div className="contact__icon" aria-hidden>
                <img
                  src={iconLocation}
                  alt=""
                  aria-hidden="true"
                  style={{ width: 30, height: 40, objectFit: "contain", display: "block" }}
                />
              </div>
              <div>
                <strong>Dirección</strong>
                <div className="muted">Av. Principal 123 y Calle Secundaria, Quito, Ecuador</div>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__icon" aria-hidden>
                <img className="imagen-telefono"
                  src={iconPhone}
                  alt=""
                  aria-hidden="true"
                  style={{ width: 29, height: 40, objectFit: "contain", display: "block" }}
                />
              </div>
              <div>
                <strong>Teléfono</strong>
                <div className="muted"><a href="tel:+593991234567">+593 99 123 4567</a></div>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__icon" aria-hidden>
                <img className="imagen-email"
                  src={iconEmail}
                  alt=""
                  aria-hidden="true"
                  style={{ width: 30, height: 40, objectFit: "contain", display: "block"}}
                />
              </div>
              <div>
                <strong>Email</strong>
                <div className="muted"><a href="mailto:info@ecuadoraesthetics.com">info@ecuadoraesthetics.com</a></div>
              </div>
            </div>

            <div className="contact__map" aria-hidden>
              Espacio para Mapa
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
