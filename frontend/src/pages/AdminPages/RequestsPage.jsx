import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRequestStore } from '../../store/requestStore.js';
const RequestsPage = () => {
    const { Requests, requests } = useRequestStore();
    useEffect(() => {
        Requests();
    }, [requests]);
    return (
        <div className='h-screen'>
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Search" />
            </label>
            <div className='my-5 max-w-7xl mx-auto bg-base-300 p-3 rounded-xl text-center'>
                <div className='grid grid-cols-4'>
                    <h1 className='font-bold font-poppins'>Book Picture</h1>
                    <h1 className='font-bold font-poppins'>Book Name</h1>
                    <h1 className='font-bold font-poppins'>User Name</h1>
                    <h1 className='font-bold font-poppins'>Action</h1>
                </div>
                {requests && requests.length > 0 ? (
                    requests.map((req) => (
                        <div key={req._id} className='my-5 grid grid-cols-4 gap-5 items-center'>
                            <div className='flex justify-center'>
                                <img
                                    src={req.book?.picture}
                                    className='h-[3rem] w-[3rem] rounded-full object-cover'
                                    alt='Book'
                                />
                            </div>
                            <h1 className='text-center font-bold font-josefin text-orange-500'>
                                {req.book?.name}
                            </h1>
                            <h1 className='text-center font-bold font-josefin text-orange-500'>
                                {req.user?.username}
                            </h1>
                            <div className='flex items-center justify-center flex-wrap gap-3'>
                                <button type='button' className='btn btn-error font-josefin'>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                                <button type='button' className='btn btn-success text-white font-josefin'>
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="mt-5 text-center text-gray-400">No requests found.</h1>
                )}
            </div>
        </div>
    );
};
export default RequestsPage;