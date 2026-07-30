import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentMethod, createUserCart } from '../../store/actions';

const PaymentMethod = () => {

    // Used to dispatch Redux actions
    const dispatch = useDispatch();

    // Currently selected payment method from Redux
    // Example: "Stripe" or "Paypal"
    const { paymentMethod } = useSelector(
        (state) => state.payment
    );

    // Cart items and cartId from Redux
    const { cart, cartId } = useSelector(
        (state) => state.carts
    );

    // Loading and error states
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    // Runs when component loads
    useEffect(() => {

        // If:
        // 1. Cart has products
        // 2. Cart doesn't already exist in backend
        // 3. No error exists

        if (cart.length > 0 && !cartId && !errorMessage) {

            // Convert cart objects into backend format
            const sendCartItems = cart.map((item) => {

                return {
                    productId: item.productId,
                    quantity: item.quantity,
                };

            });

            /*
                Example:

                Frontend Cart:

                {
                  productId: 1,
                  productName: "iPhone",
                  image: "...",
                  price: 50000,
                  quantity: 2
                }

                Converted to:

                {
                  productId: 1,
                  quantity: 2
                }
            */

            // Create cart in backend database
            dispatch(
                createUserCart(sendCartItems)
            );
        }

    }, [dispatch, cartId]);

    // Called whenever user selects Stripe or Paypal
    const paymentMethodHandler = (method) => {

        /*
            Example:

            method = "Stripe"

            Dispatch Action:
            ADD_PAYMENT_METHOD

            Redux Store:

            paymentMethod = "Stripe"
        */

        dispatch(
            addPaymentMethod(method)
        );
    }

    return (

        <div
            className="
            max-w-md
            mx-auto
            p-5
            bg-white
            shadow-md
            rounded-lg
            mt-16
            border"
        >

            {/* Heading */}
            <h1 className="text-2xl font-semibold mb-4">
                Select Payment Method
            </h1>

            {/* Material UI Form Container */}
            <FormControl>

                <RadioGroup

                    // Accessibility label
                    aria-label="payment method"

                    // Form field name
                    name="paymentMethod"

                    // Selected value
                    value={paymentMethod}

                    // Trigger whenever selection changes
                    onChange={(e) =>
                        paymentMethodHandler(
                            e.target.value
                        )
                    }
                >

                    {/* Stripe Option */}

                    <FormControlLabel
                        value="Stripe"
                        control={
                            <Radio color="primary" />
                        }
                        label="Stripe"
                        className="text-gray-700"
                    />

                    {/* Paypal Option */}

                    <FormControlLabel
                        value="Paypal"
                        control={
                            <Radio color="primary" />
                        }
                        label="Paypal"
                        className="text-gray-700"
                    />

                </RadioGroup>

            </FormControl>

        </div>
    )
}

export default PaymentMethod