import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const paymentElement = elements.getElement(PaymentElement);
        if (!paymentElement) {
            setMessage("El formulario de pago no termino de cargar. Espera y reintenta.");
            setIsLoading(false);
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setMessage(submitError.message);
            setIsLoading(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/contacto", // Fallback
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Pago exitoso!");
            if (onSuccess) onSuccess(paymentIntent);
        } else {
            setMessage("Algo salió mal. Intente nuevamente.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };

    if (message === "Pago exitoso!") {
        return (
            <div className="w-full text-center py-8 animate-fade-in">
                <div className="mb-4 flex justify-center">
                    <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¡Pago Realizado!</h3>
                <p className="text-gray-400">Procesando su cita...</p>
            </div>
        );
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="w-full">
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="boton-formulario w-full mt-4"
                style={{ marginTop: '1.5rem' }}
            >
                <span id="button-text">
                    {isLoading ? "Procesando..." : "Pagar $100 y Agendar"}
                </span>
            </button>
            {message && <div id="payment-message" className="mt-4 text-center text-sm text-red-400">{message}</div>}
        </form>
    );
}
