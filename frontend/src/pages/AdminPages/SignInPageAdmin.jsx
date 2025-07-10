import React, { useState } from 'react';
import Input from '../../components/Input';
import { FaUser, FaLock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import Loader from '../../tools/Loader.jsx';
import { Link } from 'react-router';
const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isUsernameValid = username.trim().length >= 3;
    const isPasswordValid = password.trim().length >= 3;
    const { signinAdmin, isLoading, error } = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signinAdmin(username, password);
    };
    return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
            <div className='p-8 rounded-lg shadow-md bg-slate-950 w-96'>
                <h1 className='text-white font-bold text-2xl mb-6 text-center'>Sign In Admin</h1>
                <Input
                    type="text"
                    placeholder="Username"
                    icon={FaUser}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    icon={FaLock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex flex-col my-4'>
                    <Link to={'/forgot-password'} className='text-sm text-decoration-underline font-josefin'>forget password?</Link>
                </div>
                <div className='flex flex-col gap-2 my-3'>
                    <ValidationItem
                        valid={isPasswordValid}
                        text="Password length 8"
                    />
                    <ValidationItem
                        valid={isUsernameValid}
                        text="Username length 6"
                    />
                </div>
                <button
                    disabled={(!(isUsernameValid && isPasswordValid) || isLoading)}
                    className='mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-md 
                    hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition'
                    onClick={handleSubmit}>
                    {isLoading ? <Loader /> : 'Sign In'}
                </button>
                {error && <p className='text-red-500 font-semibold my-2'>{error}</p>}
            </div>
        </div>
    );
};
const ValidationItem = ({ valid, text }) => (
    <p className='text-gray-200 text-sm font-light flex items-center gap-2'>
        {valid ? (
            <FaCheckCircle className='text-green-400' />
        ) : (
            <FaTimesCircle className='text-red-400' />
        )}
        {text}
    </p>
);
export default SignInPage;