import axios from "axios";

// Axios instance configured with backend API base URL
const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials: true,
});

// Request Interceptor: Attach JWT Bearer token to headers for authenticated requests
api.interceptors.request.use(
    (config) => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            try {
                const user = JSON.parse(authData);
                if (user?.jwtToken) {
                    config.headers.Authorization = `Bearer ${user.jwtToken}`;
                }
            } catch (err) {
                console.error("Error parsing auth token", err);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle expired/invalid JWT tokens (401 Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            // Ignore login and registration endpoints to allow error messages to display
            const isAuthRequest = error.config?.url?.includes("/auth/signin") || error.config?.url?.includes("/auth/signup");
            if (!isAuthRequest) {
                // Clear stale session credentials and redirect to login
                localStorage.removeItem("auth");
                localStorage.removeItem("client-secret");
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;