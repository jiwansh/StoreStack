import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
import { errorReducer } from "./errorReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : null;

const clientSecret = localStorage.getItem("client-secret")
    ? JSON.parse(localStorage.getItem("client-secret"))
    : null;

const initialState = {
    auth: {
        user: user,
        address: [],
        clientSecret: clientSecret,
        selectedUserCheckoutAddress: selectedUserCheckoutAddress,
    },
    carts: {
        cart: cartItems,
        totalPrice: 0,
        cartId: null,
    },
};

const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        carts: cartReducer,
        errors: errorReducer,
        payment: paymentMethodReducer,
    },
    preloadedState: initialState,
});

export default store;