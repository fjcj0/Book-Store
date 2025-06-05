import mongoose from 'mongoose';
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    picture: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });
export const Book = mongoose.model('Book', bookSchema);