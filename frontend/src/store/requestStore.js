import { create } from 'zustand';
import axios from 'axios';
axios.defaults.withCredentials = true;
export const useRequestStore = create((set, get) => ({
    errorRequest: null,
    isLoading: false,
    isLoadingRequest: false,
    successRequest: false,
    request: null,
    requests: null,
    messageRequest: null,
    Requests: async () => {
        set({ isLoadingRequest: true, errorRequest: null, messageRequest: null, successRequest: false });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_REQUEST_URL}/requests`);
            set({
                requests: response?.data?.requests,
                isLoadingRequest: false,
                errorRequest: null,
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
    approveRequest: async (bookId, userId) => {
        const { requests } = get();
        set({ isLoading: true, errorRequest: null, successRequest: false, messageRequest: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_REQUEST_URL}/approve-request`,
                { bookId, userId }
            );
            const updatedRequests = requests.filter(
                (req) => !(req.book._id === bookId && req.user._id === userId)
            );
            set({
                requests: updatedRequests,
                isLoading: false,
                successRequest: true,
                messageRequest: response?.data?.message,
                errorRequest: null,
            });
        } catch (error) {
            set({
                errorRequest: error.response?.data?.message || error.message,
                isLoading: false,
                successRequest: false,
                messageRequest: null,
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
}));