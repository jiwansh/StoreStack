import { Alert, AlertTitle, Skeleton } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';

// Load Stripe once using the publishable key from .env.
// This creates a Stripe instance that will be shared by the app.
const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
const StripePayment = () => {
    // Used to dispatch Redux actions
    const dispatch = useDispatch();
    // Secret returned by backend.
    // Required by Stripe to securely complete the payment.
    const { clientSecret } = useSelector(
        (state) => state.auth
    );
    // Final amount to be paid
    const { totalPrice } = useSelector(
        (state) => state.carts
    );

    // Loading state while backend is preparing payment
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    // Logged-in user and selected checkout address
    const { user, selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {

        // Create a Payment Intent only once.
        // If clientSecret already exists, don't create another one.
        if (!clientSecret) {
            // Data required by backend to create a Stripe Payment Intent
            const sendData = {
                // Stripe expects amount in cents.
                // Example: $20 -> 2000
                amount: Number(totalPrice) * 100,
                currency: "usd",
                email: user.email,
                name: user.username,
                // Used later while creating the order
                address: selectedUserCheckoutAddress,
                description: `Order for ${user.email}`,
                // Optional custom data
                metadata: {
                    test: "1"
                }
            };

            // Ask backend to create a Stripe Payment Intent.
            // Backend returns a clientSecret.
            dispatch(
                createStripePaymentSecret(sendData)
            );
        }

    }, [clientSecret]);

    // Show loader while waiting for backend response
    if (isLoading) {

        return (
            <div className="max-w-lg mx-auto">
                <Skeleton />
            </div>
        );
    }

    return (

        <>

            {/* Render payment form only after
                backend returns a valid clientSecret */}

            {clientSecret && (

                <Elements

                    // Stripe instance
                    stripe={stripePromise}

                    // Secret received from backend
                    options={{ clientSecret }}
                >

                    {/* Actual credit/debit card form */}
                    <PaymentForm
                        clientSecret={clientSecret}
                        totalPrice={totalPrice}
                    />

                </Elements>

            )}

        </>

    );
}

export default StripePayment;