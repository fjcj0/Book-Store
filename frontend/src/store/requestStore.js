import { create } from 'zustand';
import axios from 'axios';
axios.defaults.withCredentials = true;
export const useRequestStore = create((set) => ({
    errorRequest: null,
    isLoadingRequest: false,
    successRequest: false,
    request: null,
    requests: null,
    messageRequest: null,
    addRequest: async (bookId, userId, toDate) => {
        set({ isLoadingRequest: true, errorRequest: null, messageRequest: null, successRequest: false });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_REQUEST_URL}/add-request`,
                {
                    bookId, userId, toDate,
                }
            );
            set({
                isLoadingRequest: false,
                successRequest: true,
                messageRequest: response?.data?.message,
            });
        } catch (error) {
            set({
                errorRequest: error.response?.data?.message || error.message,
                isLoadingRequest: false,
                successRequest: false,
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
}));