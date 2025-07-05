import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSlideStore from '../store/SlideStore';
import { useBookStore } from '../store/bookStore.js';
import { useAuthStore } from '../store/authStore.js';
import Loader from '../tools/Loader.jsx';
import { toast } from 'react-hot-toast';
const Slide = () => {
    const { savedBooksUser, savedBooks, deleteSavedBookUser, isLoading } = useBookStore();
    const { isSlideOpen, closeSlide } = useSlideStore();
    const { user } = useAuthStore();
    useEffect(() => {
        savedBooksUser(user._id);
    }, [savedBooks]);
    const Submit = async (e, savedBookId) => {
        e.preventDefault();
        await deleteSavedBookUser(savedBookId);
        toast.success('savedBook has been removed successfully!!');
    };
    return (
        <div
            className={`
                fixed top-0 left-0 h-screen w-[18rem] bg-base-300 z-50
                transform transition-transform duration-300 ease-in-out
                ${isSlideOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            <div className='p-3 flex items-end justify-end'>
                <button type='button' className='btn btn-error' onClick={closeSlide}>X</button>
            </div>
            <div className='flex flex-col items-center justify-center gap-5 p-5 overflow-y-auto max-h-[calc(100vh-4rem)]'>
                {savedBooks && savedBooks.length > 0 ? (
                    savedBooks.map((saved, index) => (
                        <div key={index} className='flex flex-col items-center justify-center gap-5'>
                            <img
                                src={saved.book?.picture}
                                className='w-[5rem] h-[5rem] rounded-full object-cover'
                                alt={saved.book?.name}
                            />
                            <h1 className='font-mochiy font-bold text-center'>
                                {saved.book?.name}
                            </h1>
                            <div className='flex items-center justify-center gap-3'>
                                <Link to={`/book/${saved.book?._id}`}>
                                    <button
                                        disabled={isLoading}
                                        className={`btn btn-primary ${isLoading ? 'opacity-50' : ''}`}
                                    >View</button>
                                </Link>
                                <button
                                    onClick={(e) => Submit(e, saved?._id)}
                                    disabled={isLoading}
                                    className={`btn btn-error ${isLoading ? 'opacity-50' : ''}`}>
                                    {isLoading ? <Loader /> : 'Remove'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center w-full text-gray-500 font-semibold">No saved books yet!!</p>
                )}
            </div>
        </div>
    );
};
export default Slide;