import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRequestStore } from '../../store/requestStore.js';
import { useAuthStore } from '../../store/authStore.js';
import Loader from '../../tools/Loader.jsx';
import { toast } from 'react-hot-toast';
const RequestsPage = () => {
    const { Requests, requests, approveRequest, isLoading, rejectRequest } = useRequestStore();
    const { user } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        Requests();
    }, []);
    const SubmitApproveRequest = async (e, bookId) => {
        e.preventDefault();
        await approveRequest(bookId, user._id);
        toast.success('Book request has been accepted!!');
    };
    const SubmitRejectRequest = async (e, requestId) => {
        e.preventDefault();
        await rejectRequest(requestId);
        toast.success('Request has been rejected successfully!!');
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredRequests = (requests || []).filter((req) => {
        const bookName = req.book?.name?.toLowerCase() || '';
        const userName = req.user?.username?.toLowerCase() || '';
        return (
            bookName.includes(searchQuery.toLowerCase()) ||
            userName.includes(searchQuery.toLowerCase())
        );
    });
    return (
        <div className='h-screen'>
            <label className="input my-5 flex items-center gap-2 border p-2 rounded-lg bg-white shadow-md w-full max-w-xl mx-auto">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
            <div className='my-5 max-w-7xl mx-auto bg-base-300 p-3 rounded-xl text-center'>
                <div className='grid grid-cols-4'>
                    <h1 className='font-bold font-poppins'>Book Picture</h1>
                    <h1 className='font-bold font-poppins'>Book Name</h1>
                    <h1 className='font-bold font-poppins'>User Name</h1>
                    <h1 className='font-bold font-poppins'>Action</h1>
                </div>
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => (
                        <div key={req._id} className='my-5 grid grid-cols-4 gap-5 items-center'>
                            <div className='flex justify-center'>
                                <img
                                    src={req.book?.picture || '/default-book.png'}
                                    className='h-[3rem] w-[3rem] rounded-full object-cover'
                                    alt='Book'
                                />
                            </div>
                            <h1 className='text-center font-bold font-josefin text-orange-500'>
                                {req?.book?.name}
                            </h1>
                            <h1 className='text-center font-bold font-josefin text-orange-500'>
                                {req?.user?.username}
                            </h1>
                            <div className='flex items-center justify-center flex-wrap gap-3'>
                                <button
                                    onClick={(e) => SubmitRejectRequest(e, req._id)}
                                    type="button"
                                    className={`btn btn-error font-josefin ${isLoading ? 'opacity-50' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader /> : <FontAwesomeIcon icon={faXmark} />}
                                </button>
                                <button
                                    onClick={(e) => SubmitApproveRequest(e, req?.book?._id)}
                                    type="button"
                                    className={`btn btn-success text-white font-josefin ${isLoading ? 'opacity-50' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader /> : <FontAwesomeIcon icon={faCheck} />}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="mt-5 text-center text-gray-400">No requests found!!</h1>
                )}
            </div>
        </div>
    );
};
export default RequestsPage;