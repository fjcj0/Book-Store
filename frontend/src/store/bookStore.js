import { create } from 'zustand';
import axios from 'axios';
axios.defaults.withCredentials = true;
export const useBookStore = create((set) => ({
    error: null,
    isLoading: false,
    success: false,
    message: null,
    addBook: async (name, quantity, description, picture) => {
        set({ isLoading: true, error: null, success: false });
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('quantity', quantity);
            formData.append('description', description);
            formData.append('picture', picture);
            const response = await axios.post(
                `${import.meta.env.VITE_API_BOOK_URL}/add-book`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            set({
                isLoading: false,
                success: true,
                message: response.data?.message,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                isLoading: false,
                success: false,
                message: null
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
}));