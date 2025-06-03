import { create } from 'zustand';
import axios from 'axios';
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    signup: async (username, email, name, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_USER_URL}/signup`, {
                username, email, name, password
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || error.message, isLoading: false });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_USER_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Verification failed',
                isLoading: false
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_USER_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({
                error: null,
                isAuthenticated: false,
                isCheckingAuth: false
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    signin: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_USER_URL}/login`, {
                username, password
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || error.message, isLoading: false });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
}));