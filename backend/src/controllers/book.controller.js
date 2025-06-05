import { Book } from '../models/book.model.js';
import cloudinary from 'cloudinary';
import { getPublicIdFromUrl } from '../utils/getPublicFormUrl.js';
export const addBook = async (request, response) => {
    const { name, quantity, picture, description } = request.body;
    try {
        if (!name || !quantity || !picture || !description) {
            return response.status(400).json({ success: false, message: 'All fields are required!' });
        }
        const uploadResult = await cloudinary.uploader.upload(picture, {
            folder: 'books'
        });
        const newBook = new Book({
            name,
            quantity,
            picture: uploadResult.secure_url,
            description
        });
        await newBook.save();
        return response.status(201).json({ success: true, message: 'Book added successfully!', book: newBook });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const deleteBook = async (request, response) => {
    try {
        const { id } = request.body;
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).json({ success: false, message: 'Book not found' });
        }
        const publicId = getPublicIdFromUrl(book.picture);
        await cloudinary.uploader.destroy(publicId);
        await Book.findByIdAndDelete(id);
        return response.status(200).json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const findBook = async (request, response) => {
    const { id } = request.body;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).json({ success: false, message: "No book" });
        }
        return response.status(200).json({ success: true, book });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};
export const editBook = async (request, response) => {
    const { id, newName, newQuantity, newPicture, newDescription } = request.body;
    try {
        if (id) {
            const book = await Book.findById(id);
            if (newName) book.name = newName;
            if (newQuantity) book.quantity = newQuantity;
            if (newDescription) book.description = newDescription;
            if (newPicture) {
                const publicId = getPublicIdFromUrl(book.picture);
                await cloudinary.uploader.destroy(publicId);
                const uploadResult = await cloudinary.uploader.upload(newPicture, {
                    folder: 'books'
                });
                book.picture = uploadResult.secure_url;
            }
            await book.save();
            return response.status(200).json({ success: true, message: 'Book has been changed successfully!!', book });
        }
        return response.status(400).json({ success: false, message: 'Book is not on collection!!' });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};