import React from 'react';
import Input from '../../components/Input';
import { FaUser, FaLock, FaCheckCircle } from 'react-icons/fa';
const SignInPage = () => {
    return (
        <div className='w-full h-[100vh] flex items-center justify-center '>
            <div className='p-8 rounded-lg shadow-md bg-slate-950 w-96'>
                <h1 className='text-white font-bold text-2xl mb-6 text-center'>Sign In</h1>
                <Input type="text" placeholder="Username" icon={FaUser} />
                <Input type="password" placeholder="Password" icon={FaLock} />
                <div className='flex flex-col gap-2 my-3'>
                    <p className='text-gray-200 text-sm font-light flex items-center gap-2'>
                        <FaCheckCircle className='text-green-400' />
                        Password is entered
                    </p>
                    <p className='text-gray-200 text-sm font-light flex items-center gap-2'>
                        <FaCheckCircle className='text-green-400' />
                        Username is entered
                    </p>
                </div>
                <button className='mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-800 duration-300 transition'>
                    Sign In
                </button>
            </div>
        </div>
    );
};
export default SignInPage;