import React, { useEffect, useState } from 'react';
import { useBookStore } from '../../store/bookStore.js';
import { useParams } from 'react-router-dom';
import Loader from '../../tools/Loader.jsx';
import { toast } from 'react-hot-toast';
const EditBookPage = () => {
    const { id } = useParams();
    const { editBook, isLoading, findBook, book, success } = useBookStore();
    const [newName, setNewName] = useState('');
    const [newQuantity, setNewQuantity] = useState(0);
    const [newDescription, setNewDescription] = useState('');
    const [newPicture, setNewPicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    useEffect(() => {
        findBook(id);
    }, [id, findBook]);
    useEffect(() => {
        if (book) {
            setNewName(book.name || '');
            setNewQuantity(book.quantity || 0);
            setNewDescription(book.description || '');
            setPreviewImage(book.picture || null);
        }
    }, [book]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewPicture(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };
    const handleSubmit = async () => {
        await editBook(id, newName, newQuantity, newDescription, newPicture);
        if (success) toast.success('Book has been edited successfully!!');
    };
    return (
        <div className='w-screen h-screen flex sm:justify-center justify-start items-center font-josefin'>
            {book ? (
                <div className='bg-base-300 p-5 rounded-xl w-[90%] max-w-[700px]'>
                    <h1 className='text-3xl font-mochiy'>Edit <span className='text-yellow-400'>Book</span></h1>
                    <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        <input
                            type="text"
                            placeholder="Change book name"
                            className="input"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder='Change quantity'
                            className='input'
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(Number(e.target.value))}
                        />
                    </div>
                    <div className='my-2'>
                        <textarea
                            className='input p-3 w-full h-[7rem]'
                            placeholder='Change description'
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                    </div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Choose New Picture</legend>
                        <input
                            type="file"
                            className="file-input"
                            onChange={handleImageChange}
                        />
                        <label className="label">Max size 2MB</label>
                    </fieldset>
                    {previewImage && (
                        <div className='flex items-center justify-center'>
                            <img
                                src={previewImage}
                                alt="Preview"
                                className='my-3 w-[10rem] h-[10rem] rounded-xl object-cover'
                            />
                        </div>
                    )}
                    <button
                        type='button'
                        disable={isLoading}
                        onClick={handleSubmit}
                        className={`bg-yellow-400 hover:bg-yellow-600 duration-300 px-4 py-2 rounded-md text-base-300 font-bold ${isLoading ? 'opacity-50' : ''}`}>
                        {isLoading ? <Loader /> : 'Submit'}
                    </button>
                </div>
            ) : (
                <h1 className='text-3xl font-josefin text-red-500'>Error 404: Book not found</h1>
            )}
        </div>
    );
};
export default EditBookPage;