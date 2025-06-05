import mongoose from 'mongoose';
const borrowedBookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    borrowedAt: {
        type: Date,
        default: Date.now,
    },
    to: {
        type: Date,
        required: true,
    },
    returned: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
export const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);