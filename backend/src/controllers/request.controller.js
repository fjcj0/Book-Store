import { Request } from '../models/request.model.js';
import { BorrowedBook } from '../models/borrowedbook.model.js';
import { Book } from '../models/book.model.js';
import moment from 'moment';
export const requests = async (request, response) => {
    try {
        const requestsList = await Request.find({})
            .populate({
                path: 'user',
            })
            .populate({
                path: 'book',
            });
        if (!requestsList || requestsList.length === 0) {
            return response.status(400).json({
                success: true,
                message: 'There is no request!!'
            });
        }
        return response.status(200).json({
            success: true,
            requests: requestsList
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const addRequest = async (request, response) => {
    const { bookId, userId, toDate } = request.body;
    try {
        if (!bookId || !userId || !toDate) {
            return response.status(401).json({ success: false, message: 'BookId, userId, and toDate are required fields!!' });
        }
        const checkRequest = await Request.findOne({ book: bookId, user: userId });
        if (checkRequest) {
            return response.status(401).json({
                success: false,
                message: 'This book is already requested. Please wait until the admin accepts your request.'
            });
        }
        const checkBorrowedBook = await BorrowedBook.findOne({ book: bookId, user: userId });
        if (checkBorrowedBook) {
            return response.status(401).json({
                success: false,
                message: 'This book is already borrowed. Please wait until it is returned.'
            });
        }
        const book = await Book.findById(bookId);
        if (book.quantity === 0) {
            return response.status(401).json({ success: false, message: 'There are no available copies of this book.' });
        }
        const newRequest = new Request({
            book: bookId,
            user: userId,
            message: 'Please wait, your request has been sent.',
            toDate
        });
        await newRequest.save();
        await newRequest.populate('book');
        await newRequest.populate('user');
        return response.status(200).json({
            success: true,
            message: 'Your request has been sent.',
            request: newRequest
        });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const rejectRequest = async (request, response) => {
    const { requestId } = request.query;
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
        const theRequest = await Request.findOne({ book: bookId, user: userId });
        if (theRequest) {
            const toDate = theRequest.toDate;
            const checkBorrowedBook = await BorrowedBook.findOne({ user: userId, book: bookId });
            if (checkBorrowedBook) return response.status(200).json({ success: true, message: 'This book is added before!!' });
            const book = await Book.findById(bookId);
            if (book.quantity == 0) {
                return response.status(400).json({ success: false, message: 'There is no enough book!!' });
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
export const getWeeklyRequestStats = async (req, res) => {
    try {
        const today = moment().startOf('day');
        const lastWeek = moment().subtract(6, 'days').startOf('day');
        const data = await Request.aggregate([
            {
                $match: {
                    requestedAt: {
                        $gte: lastWeek.toDate(),
                        $lte: today.clone().endOf('day').toDate(),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$requestedAt' },
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