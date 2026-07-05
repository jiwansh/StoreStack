import { Skeleton } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = ({ clientSecret, totalPrice }) => {

    // Gives access to Stripe methods (confirmPayment, etc.)
    const stripe = useStripe();

    // Gives access to Stripe Elements (PaymentElement)
    const elements = useElements();

    // Stores any payment error message to show the user
    const [errorMessage, setErrorMessage] = useState("");

    // Runs when the user clicks the "Pay" button
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Wait until Stripe is fully initialized
        if (!stripe || !elements) {
            return;
        }
        // Validate the payment form before confirming payment
        const { error: submitError } = await elements.submit();
        // If validation fails, show the error and stop
        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }
        // Ask Stripe to complete the payment
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            // Where Stripe redirects after payment
            confirmParams: {
                return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
            },
        });
        // Show Stripe error (invalid card, declined card, etc.)
        if (error) {
            setErrorMessage(error.message);
            return;
        }
    };
    // Display the available payment methods in tab layout
    const paymentElementOptions = {
        layout: "tabs",
    };
    // Show loader until Stripe and clientSecret are ready
    const isLoading = !clientSecret || !stripe || !elements;
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
            {/* Page heading */}
            <h2 className="text-xl font-semibold mb-4">
                Payment Information
            </h2>
            {isLoading ? (
                // Show loading placeholder
                <Skeleton />
            ) : (
                <>
                    {/* Stripe's secure payment form */}
                    {clientSecret && (
                        <PaymentElement options={paymentElementOptions} />
                    )}
                    {/* Show payment errors, if any */}
                    {errorMessage && (
                        <div className="text-red-500 mt-2">
                            {errorMessage}
                        </div>
                    )}
                    {/* Submit payment */}
                    <button
                        className="text-white w-full px-5 py-[10px] bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
                        disabled={!stripe || isLoading}
                    >
                        {/* Show amount when ready */}
                        {!isLoading
                            ? `Pay $${Number(totalPrice).toFixed(2)}`
                            : "Processing"}
                    </button>
                </>
            )}
        </form>
    );
};

export default PaymentForm;