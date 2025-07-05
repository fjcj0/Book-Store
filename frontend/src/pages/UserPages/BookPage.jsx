import React, { useEffect, useState } from 'react';
import { useBookStore } from '../../store/bookStore.js';
import { useParams } from 'react-router-dom';
import Loader from '../../tools/Loader.jsx';
import { useAuthStore } from '../../store/authStore.js';
import { toast } from 'react-hot-toast';
const BookPage = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);
    const twoWeeksLaterStr = twoWeeksLater.toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState('');
    const { book, findBook, isFoundBook, isLoadingBook, isLoading, addSavedBook, error, savedBooksUser } = useBookStore();
    const { user } = useAuthStore();
    const { id } = useParams();
    useEffect(() => {
        findBook(id);
    }, []);
    const submitAddSavedBook = async (e) => {
        e.preventDefault();
        await addSavedBook(user._id, book._id);
        await savedBooksUser(user._id);
        toast.success('Book added successfully!!');
    };
    if (isFoundBook == false) {
        return (
            <div className='w-screen h-screen flex items-center justify-center'>
                <p className={`text-center text-red-600 font-josefin text-4xl ${isLoadingBook ? 'hidden' : ''}`}>Error 404 Not Found</p>
            </div>
        );
    }
    return (
        <div className='w-full flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-3xl my-3 lg:max-w-none lg:w-[95%] bg-white lg:rounded-md flex flex-col lg:flex-row items-center justify-between'>
                <div className='h-full p-3 flex w-full lg:w-[50%] items-start justify-center'>
                    <img
                        src={book.picture}
                        className='object-cover rounded-md w-full max-h-96 lg:max-h-full'
                        alt="Book Cover"
                    />
                </div>
                <div className='w-full lg:w-[50%] h-full flex flex-col items-start justify-start p-3'>
                    <h1 className='font-bold text-green-500 text-3xl font-mochiy'>Sndrella</h1>
                    <p className='text-black my-3 font-josefin text-sm'>
                        {book.description}
                    </p>
                    <button
                        onClick={submitAddSavedBook}
                        disabled={isLoading}
                        type='button'
                        className={`bg-green-600 hover:bg-green-900 px-2 py-3 text-white font-bold font-poppins rounded-md duration-300 ${isLoading ? 'opacity-50' : ''}`}
                    >
                        {isLoading ? <Loader /> : 'Add To Cart'}
                    </button>
                    <div className='flex flex-col text-black font-josefin sm:flex-row items-start justify-start gap-3 my-3'>
                        <div className='flex gap-3'>
                            <label className='p-3'>Select Date:</label>
                            <input
                                type="date"
                                className='bg-base-300 text-white p-3 rounded-md'
                                min={todayStr}
                                max={twoWeeksLaterStr}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type='button'
                        className='px-4 py-3 bg-blue-600 hover:bg-blue-900 text-white font-bold font-poppins rounded-md duration-300'>
                        Borrow Book
                    </button>
                    <p className='mt-3 text-red-600 text-sm font-josefin'>{error}</p>
                </div>
            </div>
        </div>
    );
};
export default BookPage;