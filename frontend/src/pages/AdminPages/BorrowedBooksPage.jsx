import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useBookStore } from '../../store/bookStore.js';
import { toast } from 'react-hot-toast';
import Loader from '../../tools/Loader.jsx';
const BorrowedBooksPage = () => {
    const today = new Date();
    const { borrowedBooks, BorrowedBooks, returnBook, isLoadingBook } = useBookStore();
    useEffect(() => {
        borrowedBooks();
    }, []);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    const onChangeReturnStatus = async (e, bookId, borrowedBookId) => {
        e.preventDefault();
        await returnBook(bookId, borrowedBookId);
        toast.success('Book returned successfully!!');
    };
    return (
        <div>
            <label className="input my-5">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Search" />
            </label>
            <div className="my-5 max-w-7xl mx-auto bg-base-300 p-3 rounded-xl text-center">
                <div className="grid grid-cols-6 gap-3 font-bold font-poppins items-center">
                    <h1 className="col-span-1">Book Picture</h1>
                    <h1 className="col-span-1">Book Name & Due Date</h1>
                    <h1 className="col-span-1">User Name</h1>
                    <h1 className="col-span-1">Return Status</h1>
                    <h1 className="col-span-1 hidden md:block">Status</h1>
                    <h1 className="col-span-1">Action</h1>
                </div>
                {BorrowedBooks && BorrowedBooks.length > 0 ? (
                    BorrowedBooks.map((item) => {
                        const formattedToday = formatDate(today);
                        const formattedDueDate = formatDate(item.toDate);
                        const isOverdue = formattedToday > formattedDueDate && !item.returned;
                        const statusText = item.returned
                            ? 'Returned'
                            : isOverdue
                                ? 'Overdue'
                                : 'On Time';
                        const statusColor = item.returned
                            ? 'text-green-500'
                            : isOverdue
                                ? 'text-red-500'
                                : 'text-yellow-500';
                        return (
                            <div key={item._id} className="grid grid-cols-6 gap-3 my-10 items-center">
                                <div className="items-center justify-center col-span-1 hidden md:flex">
                                    <img
                                        src={item.book?.picture || '/default-book.png'}
                                        alt="Book"
                                        className="h-[3rem] w-[3rem] rounded-full object-cover"
                                    />
                                </div>
                                <div className="text-center font-josefin col-span-1">
                                    <p className="text-orange-500 font-semibold">{item.book?.name || 'N/A'}</p>
                                    <p className="text-sm text-gray-400">Due: {formattedDueDate}</p>
                                </div>
                                <h1 className="text-center font-josefin text-orange-500 col-span-1">
                                    {item.user?.username || 'N/A'}
                                </h1>
                                <div className="text-center font-josefin col-span-1">
                                    <select
                                        onChange={(e) => onChangeReturnStatus(e, item?.book?._id, item?._id)}
                                        className="select select-bordered w-full max-w-xs"
                                        value={item.returned ? 'Returned' : 'Not Returned'}
                                        disabled={item.returned || isLoadingBook}
                                    >
                                        <option>Returned</option>
                                        <option>Not Returned</option>
                                    </select>
                                </div>
                                <h1 className={`font-josefin text-center font-bold ${statusColor} col-span-1`}>
                                    {statusText}
                                </h1>
                                <div className="flex items-center justify-center col-span-1">
                                    <button
                                        disabled={!item.returned || isLoadingBook}
                                        className={`btn btn-primary text-white ${isLoadingBook ? 'opacity-50' : ''}`}>
                                        {isLoadingBook ? <Loader /> : <FontAwesomeIcon icon={faTrash} />}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h1 className="mt-5 text-center text-gray-400">No borrowed books found!!</h1>
                )}
            </div>
        </div>
    );
};
export default BorrowedBooksPage;