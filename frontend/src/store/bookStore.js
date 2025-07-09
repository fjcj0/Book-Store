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
    BorrowedBooks: null,
    totalQuantityBook: 0,
    totalBook: 0,
    totalBorrowedBook: 0,
    borrowedBooksLastWeek: null,
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
    borrowedBooks: async () => {
        set({ isLoading: true, error: null, success: false, message: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BOOK_URL}/borrowed-books`
            );
            set({
                isLoading: false,
                success: true,
                message: response?.data?.message,
                BorrowedBooks: response?.data?.borrowedBook,
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
    returnBook: async (bookId, borrowedBookId) => {
        set({ isLoadingBook: false, error: null, success: false, message: null });
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BOOK_URL}/return-borrowed-book`,
                {
                    borrowedBookId, bookId
                }
            );
            const refreshed = await axios.get(
                `${import.meta.env.VITE_API_BOOK_URL}/borrowed-books`
            );
            set({
                message: response?.data?.message,
                error: null,
                isLoadingBook: false,
                success: true,
                BorrowedBooks: refreshed?.data?.borrowedBook,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                success: false,
                isLoadingBook: false,
                message: error?.response?.data?.message,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    deleteBorrowedBook: async (bookId, borrowedBookId) => {
        set({ isLoadingBook: true, error: null, success: false, message: null });
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_BOOK_URL}/delete-borrowed-book`,
                { params: { borrowedBookId, bookId } }
            );
            const refreshed = await axios.get(
                `${import.meta.env.VITE_API_BOOK_URL}/borrowed-books`
            );
            set({
                isLoadingBook: false,
                success: true,
                message: response?.data?.message,
                BorrowedBooks: refreshed?.data?.borrowedBook,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                isLoadingBook: false,
                success: false,
                message: null,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    totalBooks: async () => {
        set({ isLoading: true, error: null, success: false, message: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BOOK_URL}/total-book`
            );
            set({
                isLoading: false,
                success: true,
                message: response?.data?.message,
                totalBook: response?.data?.totalBooks,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                isLoading: false,
                success: false,
                message: null,
                totalBook: 0,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    totalQuantity: async () => {
        set({ isLoading: true, error: null, success: false, message: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BOOK_URL}/total-quantity`
            );
            set({
                isLoading: false,
                success: true,
                message: response?.data?.message,
                totalQuantityBook: response?.data?.totalQuantity,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                isLoading: false,
                success: false,
                message: null,
                totalQuantityBook: 0,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    totalBorrowedBooks: async () => {
        set({ isLoading: true, error: null, success: false, message: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BOOK_URL}/total-borrowed-book`
            );
            set({
                isLoading: false,
                success: true,
                message: response?.data?.message,
                totalBorrowedBook: response?.data?.totalBorrowedBooks,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || error?.message,
                isLoading: false,
                success: false,
                message: null,
                totalBorrowedBook: 0,
            });
            throw new Error(error?.response?.data?.message || error?.message);
        }
    },
    getWeeklyBorrowedBookStats: async () => {
        set({ isLoading: true, error: null, success: false, message: null });
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BOOK_URL}/borrowed-book-last-week`
            );
            set({
                isLoading: false,
                success: true,
                message: response?.data?.message,
                borrowedBooksLastWeek: response?.data,
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
}));