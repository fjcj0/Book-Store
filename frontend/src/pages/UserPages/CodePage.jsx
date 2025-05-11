import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
const CodePage = () => {
    return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
            <div className='p-8 rounded-lg shadow-md bg-slate-950 w-96'>
                <h1 className='text-white font-bold text-2xl mb-6 text-center'>Verification Code</h1>
                <div className='mb-4 text-gray-300 text-center text-sm'>
                    <p>Enter the 4-digit code sent to your email</p>
                </div>
                <div className='flex justify-center gap-3 mb-6'>
                    {[...Array(4)].map((_, i) => (
                        <input
                            key={i}
                            type='text'
                            maxLength='1'
                            className='w-12 h-12 text-center text-xl rounded-md outline-none bg-white text-black'
                        />
                    ))}
                </div>
                <div className='flex flex-col gap-2 mb-4'>
                    <p className='text-gray-200 text-sm font-light flex items-center gap-2'>
                        <FaCheckCircle className='text-green-400' />
                        Code is entered
                    </p>
                </div>
                <button className='w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-800 duration-300 transition'>
                    Create Account
                </button>
            </div>
        </div>
    );
};
export default CodePage;