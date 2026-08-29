import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials: true,
});

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

export default api;