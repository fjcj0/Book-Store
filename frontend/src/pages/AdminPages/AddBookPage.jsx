import React, { useState } from 'react';
import { useBookStore } from '../../store/bookStore.js';
import { toast } from 'react-hot-toast';
import Loader from '../../tools/Loader.jsx';
const AddBookPage = () => {
    const { error, addBook, success, message, isLoading } = useBookStore();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [picture, setPicture] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !quantity || !picture || quantity < 0) {
            toast.error('Please fill all fields!!');
            return;
        }
        try {
            await addBook(name, quantity, description, picture);
            if (success == true) {
                toast.success('Book has been added successfully!!');
            }
            setName('');
            setDescription('');
            setQuantity(0);
            setPicture(null);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className='w-screen h-screen flex sm:justify-center justify-start items-center font-josefin'>
            <div className='bg-base-300 p-5 rounded-xl'>
                <h1 className='text-3xl font-mochiy'>
                    Add <span className='text-yellow-400'>Book</span>
                </h1>

                <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <input
                        type="text"
                        placeholder="Enter book name"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Enter quantity"
                        className="input"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>

                <div className='my-2'>
                    <textarea
                        className='input p-3 w-full h-[7rem]'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Choose Picture</legend>
                    <input
                        type="file"
                        className="file-input"
                        accept="image/*"
                        onChange={(e) => setPicture(e.target.files[0])}
                    />
                    <label className="label">Max size 2MB</label>
                </fieldset>

                {picture && (
                    <div className='flex items-center justify-center'>
                        <img
                            src={URL.createObjectURL(picture)}
                            alt="Preview"
                            className='my-3 w-[10rem] h-[10rem] rounded-xl object-cover'
                        />
                    </div>
                )}
                <button
                    type='button'
                    onClick={handleSubmit}
                    disable={isLoading}
                    className={`bg-yellow-400 hover:bg-yellow-600 duration-300 px-4 py-2 rounded-md text-base-300 font-bold ${isLoading ? 'opacity-50' : ''}`}>
                    {isLoading ? <Loader /> : 'Submit'}
                </button>
                <p className='mt-5 text-red-500 font-josefin text-sm'>{error ? error : ''}</p>
            </div>
        </div >
    );
};
export default AddBookPage;