import { create } from 'zustand';
import axios from 'axios';
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    totalUserIn: 0,
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
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${import.meta.env.VITE_API_USER_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || error.message, isLoading: false });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    editUser: async (userId, newUsername, newName, newProfilePicture) => {
        set({ error: null, isLoading: true });
        try {
            const formData = new FormData();
            formData.append('userId', userId);
            if (newName) formData.append('newName', newName);
            if (newUsername) formData.append('newUsername', newUsername);
            if (newProfilePicture) formData.append('profilePicture', newProfilePicture);

            const response = await axios.post(
                `${import.meta.env.VITE_API_USER_URL}/edit-user`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            // ✅ update user in store from server response
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
            });

        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                isLoading: false,
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    totalUsers: async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_USER_URL}/total-user`);
            set({ totalUserIn: response?.data?.totalUsers });
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_USER_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error sending reset password email",
            });
            throw error;
        }
    },
    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_USER_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error resetting password",
            });
            throw error;
        }
    },
}));