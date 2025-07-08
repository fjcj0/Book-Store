import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useBookStore } from '../../store/bookStore.js';
import { toast } from 'react-hot-toast';
import Loader from '../../tools/Loader.jsx';
import { Link } from 'react-router';

const EditBooksPage = () => {
    const { Books, books, deleteBook, success } = useBookStore();
    const [deletingBookId, setDeletingBookId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        Books();
    }, []);

    const deleteBookOnClick = async (id) => {
        setDeletingBookId(id);
        try {
            await deleteBook(id);
            if (success) toast.success('Book has been deleted successfully!!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setDeletingBookId(null);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = (books || []).filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='min-h-screen p-4'>
            <label className="input mb-5 flex items-center gap-2 border p-2 rounded-lg bg-white shadow-md">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    required
                    placeholder="Search"
                    className="flex-1 outline-none text-black"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </label>
            <div className='max-w-7xl mx-auto bg-base-300 p-5 rounded-xl text-center'>
                <div className='grid grid-cols-3 font-bold font-poppins border-b pb-2'>
                    <h1>Picture</h1>
                    <h1>Name</h1>
                    <h1>Action</h1>
                </div>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => {
                        const isDeleting = deletingBookId === book._id;
                        return (
                            <div key={book._id} className='my-4 grid grid-cols-3 items-center gap-5 border-b py-2'>
                                <div className='flex justify-center'>
                                    <img src={book.picture} alt={book.name} className='h-[3rem] w-[3rem] rounded-full object-cover' />
                                </div>
                                <h1 className='text-center font-josefin text-orange-500'>{book.name}</h1>
                                <div className='flex items-center justify-center flex-wrap gap-3'>
                                    <Link to={`/admin/editbook/${book._id}`}>
                                        <button type='button' className='btn btn-primary font-josefin'>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => deleteBookOnClick(book._id)}
                                        type='button'
                                        disabled={isDeleting}
                                        className={`btn btn-error font-josefin ${isDeleting ? 'opacity-50' : ''}`}
                                    >
                                        {isDeleting ? <Loader /> : <FontAwesomeIcon icon={faTrash} />}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className='text-center mt-5 text-gray-500 font-josefin'>No books found!!</div>
                )}
            </div>
        </div>
    );
};
export default EditBooksPage;