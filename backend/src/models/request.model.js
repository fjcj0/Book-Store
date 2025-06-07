import mongoose from 'mongoose';
const requestSchema = new mongoose.Schema({
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
    toDate: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    requestedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
export const Request = mongoose.model('Request', requestSchema);