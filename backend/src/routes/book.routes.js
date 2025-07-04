import express from 'express';
import { addBook, addBorrowedBookUser, addSavedBookUser, books, borrowedBooks, borrowedBooksUser, deleteBook, deleteBorrowedBook, deleteSavedBook, editBook, findBook, savedBookUser } from '../controllers/book.controller.js';
import upload from '../utils/multer.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();
router.post('/add-book', upload.single('picture'), addBook);
router.post('/edit-book', upload.single('newPicture'), editBook);
router.post('/find-book', findBook);
router.delete('/delete-book', deleteBook);
router.get('/books', books);

router.post('/add-saved-book-user', verifyToken, addSavedBookUser);
router.post('/saved-books-user', verifyToken, savedBookUser);
router.delete('/delete-saved-book-user', verifyToken, deleteSavedBook);

router.post('/add-borrowed-book-user', verifyToken, addBorrowedBookUser);
router.post('/borrowed-books-user', verifyToken, borrowedBooksUser);
router.delete('/delete-borrowed-book', deleteBorrowedBook);
router.get('/borrowed-books', borrowedBooks);
export default router;