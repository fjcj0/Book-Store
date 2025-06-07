import { Book } from '../models/book.model.js';
import cloudinary from '../utils/cloudinary.js';
import { getPublicIdFromUrl } from '../utils/getPublicFormUrl.js';
import { SavedBook } from '../models/savedbook.model.js';
import { BorrowedBook } from '../models/borrowedbook.model.js';
import { Request } from '../models/request.model.js';
export const addBook = async (request, response) => {
    try {
        const { name, quantity, description } = request.body;
        const file = request.file;
        if (!name || !quantity || !description || !file) {
            return response.status(400).json({ success: false, message: 'All fields are required!' });
        }
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'books' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(file.buffer);
        });
        const newBook = new Book({
            name,
            quantity,
            picture: uploadResult.secure_url,
            description,
        });
        await newBook.save();
        return response.status(201).json({
            success: true,
            message: 'Book added successfully!',
            book: newBook,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const deleteBook = async (request, response) => {
    const { bookId } = request.body;
    console.log(bookId);
    try {
        if (!bookId) {
            return response.status(400).json({ success: false, message: 'Id is required!!' });
        }
        const book = await Book.findById(bookId);
        if (!book) {
            return response.status(404).json({ success: false, message: 'Book not found' });
        }
        const publicId = getPublicIdFromUrl(book.picture);
        await cloudinary.uploader.destroy(publicId);
        await Request.deleteMany({ book: bookId });
        await SavedBook.deleteMany({ book: bookId });
        await BorrowedBook.deleteMany({ book: bookId });
        await Book.findByIdAndDelete(bookId);
        return response.status(200).json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const findBook = async (request, response) => {
    const { bookId } = request.body;
    try {
        if (!bookId) {
            return response.status(400).json({ success: false, message: 'Id is required!!' });
        }
        const book = await Book.findById(bookId);
        if (!book) {
            return response.status(404).json({ success: false, message: "No book" });
        }
        return response.status(200).json({ success: true, book });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const editBook = async (request, response) => {
    const { bookId, newName, newQuantity, newDescription } = request.body;
    const newPicture = request.file;
    try {
        if (!bookId) {
            return response.status(400).json({ success: false, message: 'Book ID is required!' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return response.status(404).json({ success: false, message: 'Book not found!' });
        }
        if (newName) book.name = newName;
        if (newQuantity) book.quantity = newQuantity;
        if (newDescription) book.description = newDescription;
        if (newPicture) {
            const publicId = getPublicIdFromUrl(book.picture);
            await cloudinary.uploader.destroy(publicId);
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'books' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(newPicture.buffer);
            });
            book.picture = uploadResult.secure_url;
        }
        await book.save();
        return response.status(200).json({
            success: true,
            message: 'Book has been updated successfully!',
            book
        });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};

export const addBorrowedBookUser = async (request, response) => {
    const { userId, bookId, toDate } = request.body;
    try {
        if (!userId || !bookId || !toDate) {
            return response.status(400).json({ success: false, message: 'UserId and BookId and toDate are missed!!' });
        }
        const checkBorrowedBook = await BorrowedBook.find({ user: userId, book: bookId });
        if (checkBorrowedBook) return response.status(200).json({ success: true, message: 'This book is added before!!' });
        const book = await Book.findById(bookId);
        if (book.quantity == 0) {
            return response.status(400).json({ success: false, message: 'There is no enough book' });
        }
        const newBorrowedBookUser = new BorrowedBook({
            user: userId,
            book: bookId,
            toDate: toDate
        });
        book.quantity = book.quantity - 1;
        await book.save();
        await newBorrowedBookUser.save();
        return response.status(200).json({ success: true, message: 'Book has been added successfully!!', newBorrowedBookUser });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const borrowedBooks = async (request, response) => {
    try {
        const borrowedBook = await BorrowedBook.find({});
        if (!borrowedBook || borrowedBook.length === 0) {
            return response.status(200).json({ success: true, message: 'No borrowed books found!!' });
        }
        return response.status(200).json({ success: true, borrowedBook });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const borrowedBooksUser = async (request, response) => {
    const { userId } = request.body;
    try {
        if (!userId) {
            return response.status(400).json({ success: false, message: 'Id doesnt exist!!' });
        }
        const BorrowedBooksOfUser = await BorrowedBook.find({ user: userId });
        if (!BorrowedBooksOfUser || BorrowedBooksOfUser.length == 0) {
            return response.status(200).json({ success: true, message: 'No borrowed Books for this user!!' });
        }
        return response.status(201).json({ success: true, BorrowedBooksOfUser });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const deleteBorrowedBook = async (request, response) => {
    const { borrowedBookId, bookId } = request.body;
    try {
        if (!borrowedBookId || !bookId) {
            return response.status(400).json({ success: false, message: 'bookId and borrowedBookId not exist!!' });
        }
        const checkBorrowedBook = await BorrowedBook.findById(borrowedBookId);
        if (!checkBorrowedBook) return response.status(400).json({ success: false, message: 'This book is not found!!' });
        const book = await Book.findById(bookId);
        if (checkBorrowedBook.returned == false) book.quantity = book.quantity + 1;
        await BorrowedBook.deleteOne({ _id: borrowedBookId });
        await book.save();
        return response.status(200).json({ success: true, message: 'Borrowed Book has been returned successfully!!' });
    } catch (error) {
        return response.status(500).json({ success: true, message: error.message });
    }
};

export const addSavedBookUser = async (request, response) => {
    const { userId, bookId } = request.body;
    try {
        if (!userId || !bookId) {
            return response.status(400).json({ success: false, message: 'UserId or BookId are missed!!' });
        }
        const newSavedBookUser = new SavedBook({
            user: userId,
            book: bookId
        });
        await newSavedBookUser.save();
        return response.status(200).json({ success: true, message: 'Book has been added successfully!!', newSavedBookUser });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const savedBookUser = async (request, response) => {
    const { userId } = request.body;
    try {
        if (!userId) {
            return response.status(400).json({ success: false, message: 'saved Books of user not found!!' });
        }
        const savedBooksOfUser = await SavedBook.find({ user: userId });
        if (!savedBooksOfUser || savedBookUser.length == 0) {
            return response.status(200).json({ success: true, message: 'No saved books for this user!!' });
        }
        return response.status(201).json({ success: true, savedBooksOfUser });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const deleteSavedBook = async (request, response) => {
    const { savedBookId } = request.body;
    try {
        if (!savedBookId) {
            return response.status(400).json({ success: false, message: 'saved Book of user not found!!' });
        }
        await SavedBook.deleteOne({ _id: savedBookId });
        return response.status(201).json({ success: true, message: 'Saved Book of user has been deleted successfully!!' });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};