import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
const CodePage = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;
        const updated = [...code];
        updated[index] = value;
        setCode(updated);
    };
    const isCodeValid = code.every(digit => digit !== '');
    return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
            <div className='p-8 rounded-lg shadow-md bg-slate-950 w-96'>
                <h1 className='text-white font-bold text-2xl mb-6 text-center'>Verification Code</h1>
                <div className='mb-4 text-gray-300 text-center text-sm'>
                    <p>Enter the 6-digit code sent to your email</p>
                </div>
                <div className='flex justify-center gap-3 mb-6'>
                    {code.map((value, i) => (
                        <input
                            key={i}
                            type='text'
                            inputMode='numeric'
                            maxLength='1'
                            value={value}
                            onChange={(e) => handleChange(e.target.value, i)}
                            className='w-12 h-12 text-center text-xl rounded-md outline-none bg-white text-black'
                        />
                    ))}
                </div>
                <div className='flex flex-col gap-2 mb-4'>
                    <p className='text-gray-200 text-sm font-light flex items-center gap-2'>
                        {isCodeValid ? (
                            <FaCheckCircle className='text-green-400' />
                        ) : (
                            <FaTimesCircle className='text-red-400' />
                        )}
                        {isCodeValid ? 'Code is entered' : 'Enter all 4 digits'}
                    </p>
                </div>
                <button
                    disabled={!isCodeValid}
                    className='w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-800 
                    disabled:opacity-50 disabled:cursor-not-allowed duration-300 transition'>
                    Create Account
                </button>
            </div>
        </div>
    );
};
export default CodePage;