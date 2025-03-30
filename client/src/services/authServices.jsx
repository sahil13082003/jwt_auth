import axios from "axios";

// Create an Axios instance
const API = axios.create({
    baseURL: "http://localhost:8000/api/auth", // Replace with your backend URL
});

// Automatically attach token if available
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
});

// Register a new user
export const register = (userData) => API.post("/register", userData);

// Login user
export const login = (credentials) => API.post("/login", credentials);

// Logout user
export const logout = () => {
    localStorage.removeItem("token");
};
