import mongoose from 'mongoose';
const savedBookSchema = new mongoose.Schema({
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
    savedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
export const SavedBook = mongoose.model('SavedBook', savedBookSchema);