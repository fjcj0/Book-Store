import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
const RequestsPage = () => {
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
                <div className='my-5 grid grid-cols-4 gap-5'>
                    <div className='flex justify-center'>
                        <img src='https://images.unsplash.com/photo-1746555702228-5c4f5436d4b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8' className='h-[3rem] w-[3rem] rounded-full' />
                    </div>
                    <h1 className='text-center font-bold font-josefin text-orange-500'>Sandrella</h1>
                    <h1 className='text-center font-bold font-josefin text-orange-500'>Frandelro</h1>
                    <div className='flex items-center justify-center flex-wrap gap-3'>
                        <button type='button' className='btn btn-error font-josefin'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <button type='button' className='btn btn-success text-white font-josefin'>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default RequestsPage;