import { Request } from '../models/request.model.js';
import { BorrowedBook } from '../models/borrowedbook.model.js';
import { Book } from '../models/book.model.js';
export const requests = async (request, response) => {
    try {
        const request = await Request.find({});
        if (!request || request.length == 0) {
            return response.status(200).json({ success: true, message: 'there is no request!!' });
        }
        return response.status(200).json({ success: true, request });
    } catch (error) {
        return response.status(200).json({ success: false, message: error.message });
    }
};
export const addRequest = async (request, response) => {
    const { bookId, userId, toDate } = request.body;
    try {
        if (!bookId || !userId || !toDate) {
            return response.status(400).json({ success: false, message: 'BookId and userId and toDaTE are required fields!!' });
        }
        const checkRequest = await Request.findOne({ book: bookId, user: userId });
        if (checkRequest) {
            return response.status(200).json({ success: true, message: 'this book is requested before successfully be waiting until the admin accept your request!!' });
        }
        const checkBorrowedBook = await BorrowedBook.findOne({ book: bookId, user: userId });
        if (checkBorrowedBook) {
            return response.status(200).json({ success: true, message: 'this book is borrowed before successfully be waiting until the admin accept your request!!' });
        }
        const book = await Book.findById(bookId);
        if (book.quantity == 0) {
            return response.status(400).json({ success: false, message: 'There is no enough book' });
        }
        const request = new Request({
            book: bookId,
            user: userId,
            message: 'be waiting your request has been sent',
            toDate: toDate
        });
        await request.save();
        return response.status(200).json({ success: true, message: 'Your request has been sent' });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const rejectRequest = async (request, response) => {
    const { requestId } = request.body;
    try {
        if (!requestId) {
            return response.status(400).json({ success: false, message: 'request id field is required!!' });
        }
        const checkRequest = await Request.findById(requestId);
        if (!checkRequest) {
            return response.status(400).json({ success: false, message: 'request not found!!' });
        }
        await Request.deleteOne({ _id: requestId });
        return response.status(200).json({ success: true, message: 'request has been rejected successfully!!' });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const approveRequest = async (request, response) => {
    const { bookId, userId } = request.body;
    try {
        if (!bookId || !userId) {
            return response.status(400).json({ success: false, message: 'bookId and userId are required fields!!' });
        }
        const request = await Request.findOne({ book: bookId, user: userId });
        if (request) {
            const toDate = request.toDate;
            const checkBorrowedBook = await BorrowedBook.findOne({ user: userId, book: bookId });
            if (checkBorrowedBook) return response.status(200).json({ success: true, message: 'This book is added before!!' });
            const book = await Book.findById(bookId);
            if (book.quantity == 0) {
                return response.status(400).json({ success: false, message: 'There is no enough book' });
            }
            const newBorrowedBook = new BorrowedBook({
                book: bookId,
                user: userId,
                toDate,
            });
            book.quantity = book.quantity - 1;
            await Request.deleteOne({ book: bookId, user: userId });
            await book.save();
            await newBorrowedBook.save();
            return response.status(200).json({ success: true, message: 'your request has been accepted!!', newBorrowedBook });
        }
        return response.status(400).json({ success: false, message: 'request not found!!' });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};