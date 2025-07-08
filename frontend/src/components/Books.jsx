import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useBookStore } from '../store/bookStore.js';
const Books = () => {
    const { Books, books } = useBookStore();
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        Books();
    }, []);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredBooks = (books || []).filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className='py-20' id='books'>
            <h1 className='font-bold text-center text-3xl font-mochiy'>
                Our <span className='text-green-500'>Books</span>
            </h1>
            <div className='my-5 flex px-16 justify-start'>
                <label className="input border border-green-600 rounded-xl flex items-center gap-2 px-2 py-1">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        className="grow outline-none bg-transparent"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
            </div>
            <div className='my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[95%] mx-auto gap-6'>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <BookCard
                            key={book._id || index}
                            name={book.name}
                            description={book.description}
                            img={book.picture}
                            id={book._id}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full">No books found.</p>
                )}
            </div>
        </div>
    );
};
export default Books;