import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const BorrowedBooksPage = () => {
    const borrowedBooks = [
        {
            _id: '1',
            bookImage: '/book1.jpg',
            bookName: 'Book A',
            userName: 'John Doe',
            toDate: '2025-07-06',
        },
        {
            _id: '2',
            bookImage: '/book2.jpg',
            bookName: 'Book B',
            userName: 'Jane Smith',
            toDate: '2025-07-10',
        },
    ];
    const today = new Date();
    return (
        <div>
            <label className="input">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Search" />
            </label>
            <div className="my-5 max-w-7xl mx-auto bg-base-300 p-3 rounded-xl text-center">
                <div className="grid grid-cols-6 gap-3 font-bold font-poppins items-center">
                    <h1 className="col-span-1">Book Picture</h1>
                    <h1 className="col-span-1">Book Name</h1>
                    <h1 className="col-span-1">User Name</h1>
                    <h1 className="col-span-1">Return Status</h1>
                    <h1 className="col-span-1 hidden md:block">Status</h1>
                    <h1 className="col-span-1">Action</h1>
                </div>
                {borrowedBooks && borrowedBooks.length > 0 ? (
                    borrowedBooks.map((book) => {
                        const dueDate = new Date(book.toDate);
                        const isOverdue = today > dueDate;
                        return (
                            <div
                                key={book._id}
                                className="grid grid-cols-6 gap-3 items-center">
                                <div className="items-center justify-center col-span-1 hidden md:flex">
                                    <img
                                        src={book.bookImage || '/default-book.png'}
                                        alt="Book"
                                        className="h-[3rem] w-[3rem] rounded-full object-cover"
                                    />
                                </div>
                                <h1 className="text-center font-josefin text-orange-500 col-span-1">
                                    {book.bookName || 'N/A'}
                                </h1>
                                <h1 className="text-center font-josefin text-orange-500 col-span-1">
                                    {book.userName || 'N/A'}
                                </h1>
                                <div className="text-center font-josefin col-span-1">
                                    <select className="select select-bordered w-full max-w-xs">
                                        <option>Returned</option>
                                        <option>Not Returned</option>
                                    </select>
                                </div>
                                <h1
                                    className={`font-josefin text-center font-bold ${isOverdue ? 'text-red-500' : 'text-green-500'
                                        } col-span-1`}
                                >
                                    {isOverdue ? 'Overdue' : 'On Time'}
                                </h1>
                                <div className="flex items-center justify-center col-span-1">
                                    <button className="btn btn-primary text-white">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h1 className="mt-5 text-center text-gray-400">
                        No borrowed books found!!
                    </h1>
                )}
            </div>
        </div>
    );
};
export default BorrowedBooksPage;