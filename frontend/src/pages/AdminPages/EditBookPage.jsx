import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookStore } from '../../store/bookStore.js';
import Loader from '../../tools/Loader.jsx';
import { toast } from 'react-hot-toast';
const EditBookPage = () => {
    const { id } = useParams();
    const [newName, setNewName] = useState('');
    const [newQuantity, setNewQuantity] = useState(0);
    const [newDescription, setNewDescription] = useState('');
    const [picture, setPicture] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPicture(file);
    };
    const { book, findBook, isFoundBook, isLoadingBook, isLoading, editBook, error } = useBookStore();
    useEffect(() => {
        const fetchBook = async () => {
            await findBook(id);
        };
        fetchBook();
    }, [id]);
    useEffect(() => {
        if (isFoundBook && book) {
            setNewName(book.name || '');
            setNewQuantity(book.quantity || 0);
            setNewDescription(book.description || '');
        }
    }, [book, isFoundBook]);
    if (!isFoundBook) {
        return (
            <div className={`w-screen h-screen flex justify-center items-center font-josefin text-red-500 text-xl ${isLoadingBook == true ? 'hidden' : ''}`}>
                404 - Book not found
            </div>
        );
    }
    const Submit = async (e) => {
        e.preventDefault();
        await editBook(id, newName, newQuantity, newDescription, picture);
        toast.success('Book has been edited successfully!!');
    };
    return (
        <div className='w-screen h-screen flex sm:justify-center justify-start items-center font-josefin'>
            <div className='bg-base-300 p-5 rounded-xl w-[90%] max-w-[700px]'>
                <h1 className='text-3xl font-mochiy'>
                    Edit <span className='text-yellow-400'>Book</span>
                </h1>
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
                {(picture || book?.picture) && (
                    <div className='flex items-center justify-center'>
                        <img
                            src={picture ? URL.createObjectURL(picture) : book.picture}
                            alt="Preview"
                            className='my-3 w-[10rem] h-[10rem] rounded-xl object-cover'
                        />
                    </div>
                )}
                <button
                    type='button'
                    onClick={Submit}
                    disabled={isLoading}
                    className={`bg-yellow-400 hover:bg-yellow-600 duration-300 px-4 py-2 rounded-md text-base-300 font-bold ${isLoading ? 'opacity-50' : ''}`}>
                    {isLoading ? <Loader /> : 'Submit'}
                </button>
                <p className='text-red-600 font-josefin text-sm mt-4'>{error}</p>
            </div>
        </div>
    );
};
export default EditBookPage;