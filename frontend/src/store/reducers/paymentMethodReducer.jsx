// Initial Redux state
// No payment method selected initially
const initialState = {
    paymentMethod: null,
};

// Reducer responsible for managing payment-related state
export const paymentMethodReducer = (
    state = initialState,
    action
) => {

    // Check action type dispatched from Redux
    switch (action.type) {

        // Runs when user selects a payment method
        case "ADD_PAYMENT_METHOD":

            return {

                // Copy existing state
                ...state,

                // Update selected payment method
                paymentMethod: action.payload,
            };

        // If action type doesn't match,
        // return current state unchanged
        default:
            return state;
    }
};

