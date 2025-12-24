"use client";
import React from "react";

export default function LegalPage() {
    const currentYear = new Date().getFullYear();

    return (
        <section
            className="section legal"
            style={{ paddingTop: "7rem", paddingBottom: "4rem" }}
        >
            <div className="container">
                <header style={{ marginBottom: "2rem", textAlign: "left" }}>
                    <h2 className="h2-contact">Políticas de Privacidad, Términos de Servicio y Política de Reembolso</h2>
                    <p className="lead" style={{ maxWidth: "70ch", marginTop: ".75rem" }}>
                        Este apartado explica cómo tratamos sus datos personales, las
                        condiciones de uso del sitio web y la política de reembolsos
                        aplicable a las consultas y procedimientos del Dr. Orlando
                        Santillán. Revise esta información con detenimiento antes de
                        utilizar nuestros servicios.
                    </p>
                </header>

                <div
                    className="legal__card"
                    style={{
                        background: "var(--surface-1, #171F21)",
                        borderRadius: "16px",
                        border: "1px solid var(--divider, rgba(255,255,255,.08))",
                        boxShadow: "var(--shadow, 0 8px 30px rgba(0,0,0,.35))",
                        padding: "1.75rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        maxWidth: "900px",
                    }}
                >
                    {/* 0. INFORMACIÓN GENERAL */}
                    <section>
                        <h3 className="h3" style={{ marginBottom: ".5rem" }}>
                            0. Información General
                        </h3>
                        <p className="muted">
                            Este sitio web es operado por{" "}
                            <strong>
                                {/* TODO: reemplazar por razón social/legal definitiva */}
                                Clínica de Cirugía Plástica Dr. Orlando Santillán
                            </strong>{" "}
                            (en adelante, la &quot;Clínica&quot;), con sede en Quito,
                            Ecuador. El dominio principal es{" "}
                            <strong>www.ecuadoraesthetics.com</strong>.
                        </p>
                        <p className="muted">
                            Para consultas relacionadas con privacidad, términos de uso o
                            reembolsos, puede contactarnos a través de:
                        </p>
                        <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.6 }}>
                            <li>
                                Email de información general:{" "}
                                <strong>info@ecuadoraesthetics.com</strong>
                            </li>
                            <li>
                                Email de soporte / reembolsos:{" "}
                                <strong>soporte@ecuadoraesthetics.com</strong>
                                {/* cámbialo si usás otro correo */}
                            </li>
                            <li>Teléfono / WhatsApp: el indicado en la sección de contacto del sitio.</li>
                        </ul>
                    </section>

                    {/* 1. POLÍTICA DE PRIVACIDAD */}
                    <section>
                        <h3 className="h3" style={{ marginBottom: ".5rem" }}>
                            1. Política de Privacidad
                        </h3>
                        <p className="muted">
                            La Clínica se compromete a proteger la confidencialidad de sus
                            datos personales y a utilizarlos únicamente para los fines
                            descritos en este documento, de acuerdo con la normativa
                            aplicable en materia de protección de datos.
                        </p>

                        <h4 style={{ marginTop: "1rem", marginBottom: ".35rem" }}>
                            1.1 Datos que podemos recopilar
                        </h4>
                        <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.6 }}>
                            <li>Nombre y apellidos.</li>
                            <li>Datos de contacto (correo electrónico, teléfono).</li>
                            <li>
                                Información relativa a su consulta médica, antecedentes y
                                preferencias de tratamiento.
                            </li>
                            <li>
                                Datos de pago y facturación en caso de reservas o pagos en
                                línea.
                            </li>
                            <li>
                                Datos técnicos básicos de navegación (cookies, IP, tipo de
                                dispositivo) para mejorar la experiencia del usuario.
                            </li>
                        </ul>

                        <h4 style={{ marginTop: "1rem", marginBottom: ".35rem" }}>
                            1.2 Finalidad del tratamiento
                        </h4>
                        <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.6 }}>
                            <li>Gestionar solicitudes de información y agendamiento de citas.</li>
                            <li>
                                Enviar recordatorios, confirmaciones y comunicaciones
                                relacionadas con su consulta o procedimiento.
                            </li>
                            <li>
                                Cumplir obligaciones legales y requerimientos de las
                                autoridades competentes.
                            </li>
                            <li>
                                Mejorar la calidad del servicio y la experiencia en el sitio
                                web.
                            </li>
                        </ul>

                        <h4 style={{ marginTop: "1rem", marginBottom: ".35rem" }}>
                            1.3 Conservación y seguridad de los datos
                        </h4>
                        <p className="muted">
                            Sus datos se conservarán durante el tiempo necesario para la
                            prestación del servicio, el mantenimiento de la relación
                            asistencial y el cumplimiento de las obligaciones legales
                            correspondientes. Implementamos medidas razonables de seguridad
                            destinadas a proteger la información frente a accesos no
                            autorizados, pérdida o alteración.
                        </p>

                        <h4 style={{ marginTop: "1rem", marginBottom: ".35rem" }}>
                            1.4 Derechos del paciente/usuario
                        </h4>
                        <p className="muted">
                            Usted puede solicitar el acceso, actualización, rectificación o
                            eliminación de sus datos personales, así como oponerse a
                            determinados tratamientos, de acuerdo con la normativa vigente.
                            Para ejercer estos derechos, puede escribir a{" "}
                            <strong>soporte@ecuadoraesthetics.com</strong> indicando en el
                            asunto &quot;Derechos sobre datos personales&quot;.
                        </p>
                    </section>

                    {/* 2. TÉRMINOS DE SERVICIO */}
                    <section>
                        <h3 className="h3" style={{ marginBottom: ".5rem" }}>
                            2. Términos de Servicio
                        </h3>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            2.1 Uso del sitio web
                        </h4>
                        <p className="muted">
                            El contenido del sitio tiene carácter estrictamente informativo y
                            no sustituye una evaluación médica presencial. Al utilizar el
                            sitio, usted se compromete a proporcionar información veraz y a
                            no utilizar los formularios con fines ilícitos, abusivos o
                            contrarios a la buena fe.
                        </p>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            2.2 Reservas y pagos
                        </h4>
                        <p className="muted">
                            Algunos servicios o consultas pueden requerir el pago anticipado
                            de una reserva. Durante el proceso de agendamiento se indicará
                            el monto a abonar, la moneda de cobro, los medios de pago
                            disponibles y, cuando corresponda, los costos de transacción de
                            la pasarela de pago seleccionada.
                        </p>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            2.3 Contenido médico y resultados
                        </h4>
                        <p className="muted">
                            Los ejemplos, fotografías e información sobre procedimientos son
                            ilustrativos. Cada paciente es único y los resultados pueden
                            variar según su contexto clínico, anatomía y hábitos. La
                            decisión final sobre cualquier tratamiento se tomará siempre en
                            conjunto con el profesional médico, luego de una valoración
                            presencial o telemédica adecuada.
                        </p>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            2.4 Limitación de responsabilidad
                        </h4>
                        <p className="muted">
                            Si bien la Clínica procura mantener la información del sitio
                            actualizada y precisa, no garantiza que esté libre de errores,
                            omisiones o desactualizaciones. El uso del sitio se realiza bajo
                            responsabilidad del usuario, quien deberá confirmar
                            personalmente cualquier información relevante con el equipo
                            médico antes de tomar decisiones sobre su salud.
                        </p>
                    </section>

                    {/* 3. POLÍTICA DE REEMBOLSO */}
                    <section>
                        <h3 className="h3" style={{ marginBottom: ".5rem" }}>
                            3. Política de Reembolso
                        </h3>

                        <p className="muted">
                            La presente política aplica a los pagos realizados para
                            agendamiento de consultas, valoraciones y procedimientos
                            realizados con el Dr. Orlando Santillán, ya sea de forma
                            presencial o a través de los canales digitales de la Clínica.
                        </p>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            3.1 Pagos de reserva
                        </h4>
                        <p className="muted">
                            Para confirmar una cita o procedimiento, puede requerirse el pago
                            anticipado de una reserva. Este importe garantiza el espacio en
                            agenda y la preparación del equipo médico y de quirófano (si
                            corresponde).
                        </p>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            3.2 Cancelaciones por parte del paciente
                        </h4>
                        <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.6 }}>
                            <li>
                                <strong>Con al menos 72 horas de antelación:</strong> se podrá
                                solicitar reembolso total del importe abonado o reprogramar la
                                cita sin costo adicional.
                            </li>
                            <li>
                                <strong>Entre 72 y 24 horas antes de la cita:</strong> se podrá
                                reprogramar una vez sin costo. El reembolso, en caso de
                                solicitarse, podrá estar sujeto a un cargo administrativo de
                                hasta un porcentaje razonable del valor de la reserva (para
                                cubrir costos operativos y comisiones de pasarela de pago).
                            </li>
                            <li>
                                <strong>Menos de 24 horas o inasistencia (no show):</strong> en
                                general no se realizan reembolsos, pudiendo perderse el importe
                                abonado en concepto de reserva. Casos excepcionales (motivos
                                médicos graves, fuerza mayor acreditada) serán evaluados
                                individualmente por la Clínica.
                            </li>
                        </ul>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            3.3 Cancelaciones por parte de la Clínica
                        </h4>
                        <p className="muted">
                            En caso de que la Clínica deba cancelar o reprogramar una cita
                            por motivos médicos, logísticos o de fuerza mayor, se ofrecerá
                            al paciente:
                        </p>
                        <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.6 }}>
                            <li>Reprogramar la cita en la fecha más próxima disponible, o</li>
                            <li>Solicitar el reembolso total del importe abonado.</li>
                        </ul>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            3.4 Procedimientos ya realizados
                        </h4>
                        <p className="muted">
                            Una vez realizado el procedimiento médico o quirúrgico, no se
                            realizarán reembolsos por motivos relacionados con la percepción
                            subjetiva de los resultados estéticos, ya que estos dependen de
                            múltiples factores anatómicos y biológicos propios de cada
                            paciente. Cualquier complicación médica será tratada conforme a
                            los protocolos clínicos y a la legislación aplicable.
                        </p>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            3.5 Medio y plazo del reembolso
                        </h4>
                        <p className="muted">
                            Cuando corresponda un reembolso, se efectuará utilizando el
                            mismo medio de pago empleado por el paciente (por ejemplo,
                            tarjeta de crédito, transferencia, pasarela de pago en línea),
                            dentro de un plazo estimado de 7 a 15 días hábiles, sujeto a los
                            tiempos de procesamiento de la entidad financiera o plataforma
                            de pago.
                        </p>

                        <h4 style={{ marginTop: ".75rem", marginBottom: ".35rem" }}>
                            3.6 Contacto para solicitar reembolsos
                        </h4>
                        <p className="muted">
                            Para solicitar un reembolso o aclarar cualquier duda sobre esta
                            política, escriba a{" "}
                            <strong>soporte@ecuadoraesthetics.com</strong> indicando:
                        </p>
                        <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.6 }}>
                            <li>Nombre completo y datos de contacto.</li>
                            <li>Fecha de la cita o procedimiento.</li>
                            <li>
                                Medio de pago utilizado y comprobante de pago (si lo tiene).
                            </li>
                            <li>Motivo de la cancelación o solicitud de reembolso.</li>
                        </ul>
                    </section>

                    <p
                        className="muted"
                        style={{
                            fontSize: ".8rem",
                            marginTop: ".5rem",
                            opacity: 0.8,
                        }}
                    >
                        Última actualización: {currentYear}. Este texto es un modelo de
                        referencia y debe ser revisado y adaptado por el equipo legal o
                        contable de la Clínica antes de su uso definitivo.
                    </p>
                </div>
            </div>
        </section>
    );
}
