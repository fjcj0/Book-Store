import express from 'express';
import { addBook, addBorrowedBookUser, addSavedBookUser, borrowedBooks, borrowedBooksUser, deleteBook, deleteBorrowedBook, deleteSavedBookUser, editBook, findBook, savedBookUser } from '../controllers/book.controller.js';
const router = express.Router();
router.post('/add-book', addBook);
router.post('/edit-book', editBook);
router.post('/find-book', findBook);
router.delete('/delete-book', deleteBook);

router.post('/add-saved-book-user', addSavedBookUser);
router.post('/saved-books-user', savedBookUser);
router.delete('/delete-saved-book-user', deleteSavedBookUser);

router.post('/add-borrowed-book-user', addBorrowedBookUser);
router.post('/borrowed-books-user', borrowedBooksUser);
router.delete('/delete-borrowed-book', deleteBorrowedBook);
router.post('/borrowed-books', borrowedBooks);

export default router;