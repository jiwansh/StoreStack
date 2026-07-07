export const stripePaymentConfirmation =
    (sendData, setErrorMesssage, setLoadng, toast) => async (dispatch, getState) => {
        try {
            // Send payment details to backend to verify payment
            // and create the final order
            const response = await api.post(
                "/order/users/payments/online",
                sendData
            );
            // Order created successfully
            if (response.data) {
                // Remove checkout address from browser storage
                localStorage.removeItem("CHECKOUT_ADDRESS");

                // Remove cart items from browser storage
                localStorage.removeItem("cartItems");

                // Remove Stripe client secret
                localStorage.removeItem("client-secret");

                // Clear payment-related data from Redux
                dispatch({
                    type: "REMOVE_CLIENT_SECRET_ADDRESS"
                });

                // Empty the cart in Redux
                dispatch({
                    type: "CLEAR_CART"
                });

                // Show success notification
                toast.success("Order Accepted");

            } else {

                // Show error if backend couldn't create the order
                setErrorMesssage("Payment Failed. Please try again.");
            }

        } catch (error) {

            // Handle API/server errors
            setErrorMesssage("Payment Failed. Please try again.");
        }
};