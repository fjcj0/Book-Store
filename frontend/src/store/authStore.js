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
            console.log(error.message);
        }
    },
}));