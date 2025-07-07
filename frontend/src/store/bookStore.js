import { create } from 'zustand';
import axios from 'axios';
axios.defaults.withCredentials = true;
export const useBookStore = create((set) => ({
    error: null,
    isLoading: false,
    isLoadingBook: false,
    success: false,
    isFoundBook: false,
    book: null,
    books: null,
    message: null,
    savedBooks: null,
    BorrowedBooksUser: null,
    addBook: async (name, quantity, description, picture) => {
        set({ isLoading: true, error: null, success: false, message: null });
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
                message: response?.data?.message,
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
    Books: async () => {
        set({ isLoading: true, error: null, success: false, message: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BOOK_URL}/books`
            );
            set({
                isLoading: false,
                success: true,
                message: response?.data?.message,
                books: response?.data,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                isLoading: false,
                success: false,
                message: null,
                books: null,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    deleteBook: async (bookId) => {
        set({ isLoading: true, error: null, success: false, message: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_BOOK_URL}/delete-book`,
                { params: { bookId } }
            );
            set({
                isLoading: false,
                success: true,
                message: response?.data?.message,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                isLoading: false,
                success: false,
                message: null,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    findBook: async (bookId) => {
        set({ error: null, success: false, isFoundBook: false, book: null, isLoadingBook: true });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BOOK_URL}/find-book`
                , {
                    bookId
                });
            set({
                isFoundBook: true,
                success: true,
                book: response?.data?.book,
                error: null,
                isLoadingBook: false
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                success: false,
                isFoundBook: false,
                book: null,
                isLoadingBook: false
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    editBook: async (bookId, newName, newQuantity, newDescription, newPicture) => {
        set({ isLoading: true, error: null, success: false, message: null });
        try {
            const formData = new FormData();
            formData.append('bookId', bookId);
            if (newName) formData.append('newName', newName);
            if (newQuantity) formData.append('newQuantity', newQuantity);
            if (newDescription) formData.append('newDescription', newDescription);
            if (newPicture) formData.append('newPicture', newPicture);
            const response = await axios.post(
                `${import.meta.env.VITE_API_BOOK_URL}/edit-book`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            set({
                isLoading: false,
                success: true,
                message: response?.data?.message,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                success: false,
                isLoading: false,
                message: error?.response?.data?.message,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    addSavedBook: async (userId, bookId) => {
        set({ isLoading: false, error: null, success: false, message: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BOOK_URL}/add-saved-book-user`,
                {
                    userId, bookId
                }
            );
            set({ message: response?.data?.message, error: null, isLoading: false, success: true });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                success: false,
                isLoading: false,
                message: error?.response?.data?.message,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    savedBooksUser: async (userId) => {
        set({ isLoading: false, success: false, message: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BOOK_URL}/saved-books-user`,
                {
                    userId
                }
            );
            set({ savedBooks: response?.data?.savedBooksOfUser, isLoading: false, success: true });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                success: false,
                isLoading: false,
                message: error?.response?.data?.message,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    deleteSavedBookUser: async (savedBookId) => {
        set({ isLoading: true, error: null, success: false, message: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_BOOK_URL}/delete-saved-book-user`,
                { params: { savedBookId } }
            );
            set({
                isLoading: false,
                success: true,
                message: response?.data?.message,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                isLoading: false,
                success: false,
                message: null,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    borrowedBooksUser: async (userId) => {
        set({ isLoading: false, success: false, message: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BOOK_URL}/borrowed-books-user`,
                {
                    userId
                }
            );
            set({ BorrowedBooksUser: response?.data?.BorrowedBooksOfUser, isLoading: false, success: true });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                success: false,
                isLoading: false,
                message: error?.response?.data?.message,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
}));