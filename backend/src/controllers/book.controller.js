import { Book } from '../models/book.model.js';
import cloudinary from '../utils/cloudinary.js';
import { getPublicIdFromUrl } from '../utils/getPublicFormUrl.js';
import { SavedBook } from '../models/savedbook.model.js';
import { BorrowedBook } from '../models/borrowedbook.model.js';
import { Request } from '../models/request.model.js';
import moment from 'moment';
export const addBook = async (request, response) => {
    try {
        const { name, quantity, description } = request.body;
        const file = request.file;
        if (!name || !quantity || !description || !file) {
            console.log({ name, quantity, description, file });
            return response.status(400).json({ success: false, message: 'All fields are required!' });
        }
        const findBookName = await Book.findOne({ name: name });
        if (findBookName) return response.status(400).json({ success: false, message: 'Book is on collection!!' });
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
export const books = async (request, response) => {
    try {
        const Books = await Book.find({});
        if (Books.length == 0) {
            return response.status(200).json({ success: true, message: 'enough book!!' });
        }
        return response.status(201).json(Books);
    } catch (error) {
        console.error('Upload error:', error);
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const deleteBook = async (request, response) => {
    const { bookId } = request.query;
    console.log('Book ID:', bookId);
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
        if (newName) {
            const findBookByName = await Book.findOne({ name: newName });
            if (findBookByName) {
                return response.status(400).json({ success: false, message: 'there is a book with same name try another name please!!' });
            }
            book.name = newName;
        }
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
            message: 'Book has been updated successfully!'
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
        const checkBorrowedBook = await BorrowedBook.findOne({ user: userId, book: bookId });
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
        const borrowedBook = await BorrowedBook.find({})
            .populate({
                path: 'book',
            })
            .populate({
                path: 'user',
            });
        if (!borrowedBook || borrowedBook.length === 0) {
            return response.status(200).json({
                success: true,
                message: 'No borrowed books found!!'
            });
        }
        return response.status(200).json({
            success: true,
            borrowedBook
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const borrowedBooksUser = async (request, response) => {
    const { userId } = request.body;
    try {
        if (!userId) {
            return response.status(400).json({ success: false, message: 'Id doesn\'t exist!!' });
        }
        const BorrowedBooksOfUser = await BorrowedBook.find({ user: userId })
            .populate({
                path: 'book',
            });
        if (!BorrowedBooksOfUser || BorrowedBooksOfUser.length === 0) {
            return response.status(200).json({
                success: true,
                message: 'No borrowed books for this user!!'
            });
        }
        return response.status(200).json({
            success: true,
            BorrowedBooksOfUser
        });

    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const deleteBorrowedBook = async (req, res) => {
    try {
        const { borrowedBookId, bookId } = req.params;
        if (!borrowedBookId || !bookId) {
            return res.status(400).json({
                success: false,
                message: 'borrowedBookId and bookId are required!',
            });
        }
        const borrowedBook = await BorrowedBook.findById(borrowedBookId);
        if (!borrowedBook) {
            return res.status(404).json({
                success: false,
                message: 'Borrowed book not found!',
            });
        }
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found!',
            });
        }
        if (!borrowedBook.returned) {
            book.quantity += 1;
            await book.save();
            console.log('Book quantity updated:', book.quantity);
        }
        await BorrowedBook.findByIdAndDelete(borrowedBookId);
        console.log('Borrowed book deleted successfully');
        return res.status(200).json({
            success: true,
            message: 'Borrowed book has been returned and deleted successfully!',
        });

    } catch (error) {
        console.error('Error deleting borrowed book:', error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const returnBook = async (request, response) => {
    const { borrowedBookId, bookId } = request.body;
    try {
        if (!borrowedBookId || !bookId) {
            return response.status(400).json({ success: false, message: 'bookId and borrowedBookId not exist!!' });
        }
        const checkBorrowedBook = await BorrowedBook.findById(borrowedBookId);
        if (!checkBorrowedBook) return response.status(400).json({ success: false, message: 'This book is not found!!' });
        const book = await Book.findById(bookId);
        if (checkBorrowedBook.returned == false) {
            book.quantity = book.quantity + 1;
            checkBorrowedBook.returned = true;
            await checkBorrowedBook.save();
        }
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
        const alreadySaved = await SavedBook.findOne({ user: userId, book: bookId });
        if (alreadySaved) {
            return response.status(409).json({
                success: false,
                message: 'Book is already saved by the user!!'
            });
        }
        const newSavedBookUser = new SavedBook({
            user: userId,
            book: bookId
        });
        await newSavedBookUser.save();
        return response.status(200).json({
            success: true,
            message: 'Book has been added successfully!!',
            newSavedBookUser
        });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const savedBookUser = async (request, response) => {
    const { userId } = request.body;
    try {
        if (!userId) {
            return response.status(400).json({ success: false, message: 'User ID is required!' });
        }
        const savedBooksOfUser = await SavedBook.find({ user: userId })
            .populate({
                path: 'book',
            });
        if (!savedBooksOfUser || savedBooksOfUser.length === 0) {
            return response.status(200).json({
                success: true,
                message: 'No saved books for this user!!'
            });
        }
        return response.status(200).json({
            success: true,
            savedBooksOfUser
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const deleteSavedBook = async (request, response) => {
    const { savedBookId } = request.query;
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
export const totalBooks = async (request, response) => {
    try {
        const count = await Book.countDocuments();
        return response.status(200).json({ totalBooks: count });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const totalQuantity = async (request, response) => {
    try {
        const result = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: "$quantity" }
                }
            }
        ]);

        const total = result[0]?.totalQuantity || 0;
        return response.status(200).json({ totalQuantity: total });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const totalBorrowedBooks = async (request, response) => {
    try {
        const count = await BorrowedBook.countDocuments();
        return response.status(200).json({ totalBorrowedBooks: count });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const getWeeklyBorrowedBookStats = async (req, res) => {
    try {
        const today = moment().startOf('day');
        const lastWeek = moment().subtract(6, 'days').startOf('day');
        const data = await BorrowedBook.aggregate([
            {
                $match: {
                    borrowedAt: {
                        $gte: lastWeek.toDate(),
                        $lte: today.clone().endOf('day').toDate(),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$borrowedAt' },
                    },
                    total: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            }
        ]);
        const result = [];
        for (let i = 0; i < 7; i++) {
            const date = lastWeek.clone().add(i, 'days');
            const dateStr = date.format('YYYY-MM-DD');
            const dayName = date.format('dddd');
            const found = data.find(d => d._id === dateStr);
            result.push({
                day: dayName,
                total: found ? found.total : 0,
            });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};