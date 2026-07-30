import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '@mui/material/Skeleton';

const PaymentConfirmation = () => {
    // Gives access to the current URL
    const location = useLocation();

    // Used to read query parameters from the URL
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();

    // Stores any error returned by the backend
    const [errorMessage, setErrorMessage] = useState("");

    // Cart data from Redux
    const { cart } = useSelector((state) => state.carts);

    // Controls loading UI while confirming payment
    const [loading, setLoading] = useState(false);

    // Values returned by Stripe after successful payment
    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");

    // Retrieve the selected checkout address from localStorage
    const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : [];
        
    useEffect(() => {
        // Proceed only if Stripe has returned all required values
        // and the cart still contains products
        if (
            paymentIntent &&
            clientSecret &&
            redirectStatus &&
            cart &&
            cart.length > 0
        ) {
            // Data sent to backend to create the final order
            const sendData = {
                addressId: selectedUserCheckoutAddress.addressId,
                pgName: "Stripe",
                pgPaymentId: paymentIntent,
                pgStatus: "succeeded",
                pgResponseMessage: "Payment successful"
            };
            // Notify backend that payment is complete
            dispatch(
                stripePaymentConfirmation(
                    sendData,
                    setErrorMessage,
                    setLoading,
                    toast
                )
            );
        }
    }, [paymentIntent, clientSecret, redirectStatus, cart]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            {/* Show loader while backend confirms the payment */}
            {loading ? (
                <div className="max-w-xl mx-auto">
                    <Skeleton />
                </div>

            ) : (
                <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
                    {/* Success icon */}
                    <div className="text-green-500 mb-4 flex justify-center">
                        <FaCheckCircle size={64} />
                    </div>

                    {/* Success message */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Payment Successful!
                    </h2>
                    {/* Inform the user that the order is being processed */}
                    <p className="text-gray-600 mb-6">
                        Thank you for your purchase! Your payment was successful,
                        and we're processing your order.
                    </p>
                    {/* You can display errorMessage here if needed */}
                    {/* {errorMessage && <p>{errorMessage}</p>} */}
                </div>
            )}
        </div>
    );
}

export default PaymentConfirmation;