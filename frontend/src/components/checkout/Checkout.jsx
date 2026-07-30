import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skelton';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';

const Checkout = () => {

    // Stores current checkout step
    // 0 = Address
    // 1 = Payment Method
    // 2 = Order Summary
    // 3 = Payment
    const [activeStep, setActiveStep] = useState(0);

    // Redux dispatcher used to call actions
    const dispatch = useDispatch();

    // Loading and error state from Redux
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    // Cart data from Redux
    const { cart, totalPrice } = useSelector(
        (state) => state.carts
    );

    // User addresses and selected checkout address
    const { address, selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    );

    // Selected payment method
    const { paymentMethod } = useSelector(
        (state) => state.payment
    );

    // Move one step back
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    // Move one step forward
    const handleNext = () => {

        // Before moving from Address step,
        // user must select an address
        if(activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error(
                "Please select checkout address before proceeding."
            );
            return;
        }

        // Before moving from Payment step,
        // user must select payment method
        if(
            activeStep === 1 &&
            (!selectedUserCheckoutAddress || !paymentMethod)
        ) {
            toast.error(
                "Please select payment address before proceeding."
            );
            return;
        }

        // Move to next step
        setActiveStep((prevStep) => prevStep + 1);
    };

    // Labels shown inside Stepper
    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment",
    ];

    // Runs only once when component loads
    // Fetches user addresses from backend
    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    return (
        <div className="py-14 min-h-[calc(100vh-100px)]">

            {/* Progress Bar */}
            <Stepper activeStep={activeStep} alternativeLabel>

                {/* Create one Step component for each label */}
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}

            </Stepper>

            {/* Show Skeleton while API is loading */}
            {isLoading ? (

                <div className="lg:w-[80%] mx-auto py-5">
                    <Skeleton />
                </div>

            ) : (

                <div className="mt-5">

                    {/* STEP 0 : Address Selection */}
                    {activeStep === 0 && (
                        <AddressInfo address={address} />
                    )}

                    {/* STEP 1 : Payment Method */}
                    {activeStep === 1 && (
                        <PaymentMethod />
                    )}

                    {/* STEP 2 : Order Summary */}
                    {activeStep === 2 && (
                        <OrderSummary
                            totalPrice={totalPrice}
                            cart={cart}
                            address={selectedUserCheckoutAddress}
                            paymentMethod={paymentMethod}
                        />
                    )}

                    {/* STEP 3 : Payment */}
                    {activeStep === 3 && (

                        <>
                            {/* Show payment component based on
                                selected payment method */}

                            {paymentMethod === "Stripe" ? (
                                <StripePayment />
                            ) : (
                                <PaypalPayment />
                            )}
                        </>
                    )}

                </div>
            )}

            {/* Bottom Fixed Navigation Bar */}
            <div
                className="flex justify-between items-center
                px-4 fixed z-50 h-24 bottom-0
                bg-white left-0 w-full py-4"
            >

                {/* Back Button */}
                <Button
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>

                {/* Don't show Proceed button
                    on last step */}
                {activeStep !== steps.length - 1 && (

                    <button

                        // Disable button if required data
                        // is not selected
                        disabled={
                            errorMessage ||

                            (
                                activeStep === 0
                                ? !selectedUserCheckoutAddress

                                : activeStep === 1
                                ? !paymentMethod

                                : false
                            )
                        }

                        onClick={handleNext}
                    >
                        Proceed
                    </button>
                )}

            </div>

            {/* Global Error Component */}
            {errorMessage && (
                <ErrorPage message={errorMessage} />
            )}

        </div>
    );
};

export default Checkout;