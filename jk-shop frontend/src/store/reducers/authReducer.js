// Initial authentication state stored in Redux
const initialState = {
    // Logged-in user information
    user: null,
    // All addresses of the logged-in user
    address: [],
    // Stripe clientSecret used during payment
    clientSecret: null,
    // Address selected by the user during checkout
    selectedUserCheckoutAddress: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Save logged-in user details after login
        case "LOGIN_USER":
            return {
                ...state,
                user: action.payload,
            };
        // Store all user addresses fetched from backend
        case "USER_ADDRESS":
            return {
                ...state,
                address: action.payload,
            };
        // Save the address selected for the current order
        case "SELECT_CHECKOUT_ADDRESS":
            return {
                ...state,
                selectedUserCheckoutAddress: action.payload,
            };

        // Clear selected checkout address
        case "REMOVE_CHECKOUT_ADDRESS":
            return {
                ...state,
                selectedUserCheckoutAddress: null,
            };

        // Save Stripe clientSecret after backend creates PaymentIntent
        case "CLIENT_SECRET":
            return {
                ...state,
                clientSecret: action.payload,
            };

        // Clear payment-related data after order completes or is cancelled
        case "REMOVE_CLIENT_SECRET_ADDRESS":
            return {
                ...state,
                clientSecret: null,
                selectedUserCheckoutAddress: null,
            };

        // Clear user data on logout
        case "LOG_OUT":
            return {
                user: null,
                address: null,
            };

        // Return current state if action doesn't match any case
        default:
            return state;
    }
};