import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useBookStore } from '../../store/bookStore.js';
import { toast } from 'react-hot-toast';
import Loader from '../../tools/Loader.jsx';
const BorrowedBooksPage = () => {
    const { borrowedBooks, BorrowedBooks, returnBook, isLoadingBook, deleteBorrowedBook } = useBookStore();
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        borrowedBooks();
    }, []);
    const todayDate = new Date();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    const onChangeReturnStatus = async (e, bookId, borrowedBookId) => {
        e.preventDefault();
        await returnBook(bookId, borrowedBookId);
        toast.success('Book returned successfully!!');
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredBorrowedBooks = (BorrowedBooks || []).filter((item) => {
        const bookName = item.book?.name?.toLowerCase() || '';
        const userName = item.user?.username?.toLowerCase() || '';
        return (
            bookName.includes(searchQuery.toLowerCase()) ||
            userName.includes(searchQuery.toLowerCase())
        );
    });
    const SubmitDeleteBorrowedBook = async (e, bookId, borrowedBookId) => {
        e.preventDefault();
        await deleteBorrowedBook(bookId, borrowedBookId);
        toast.success('Borrowed Book has been deleted successfully!!');
    };
    return (
        <div>
            <label className="input my-5 flex items-center gap-2 border p-2 rounded-lg bg-white shadow-md w-full max-w-xl mx-auto">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    required
                    placeholder="Search by book or user name"
                    className="flex-1 outline-none bg-transparent text-black"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
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
                {filteredBorrowedBooks.length > 0 ? (
                    filteredBorrowedBooks.map((item) => {
                        const isOverDue = formatDate(todayDate) > formatDate(item?.toDate);
                        const statusText = item.returned ? 'Returned' : 'Pending';
                        const statusColor = item.returned ? 'text-green-500' : 'text-yellow-500';
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
                                    <p className="text-sm text-gray-400">Due: {formatDate(item.toDate)}</p>
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
                                <h1 className={`font-josefin text-center font-bold ${isOverDue ? 'text-red-600' : statusColor} col-span-1`}>
                                    {isOverDue ? 'Due pass' : statusText}
                                </h1>
                                <div className="flex items-center justify-center col-span-1">
                                    <button
                                        onClick={(e) => SubmitDeleteBorrowedBook(e, item?.book?._id, item?._id)}
                                        disabled={!item.returned || isLoadingBook}
                                        className={`btn btn-primary text-white ${isLoadingBook ? 'opacity-50' : ''}`}
                                    >
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