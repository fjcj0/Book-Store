import React, { useState } from 'react';
import Input from '../../components/Input';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaIdBadge,
    FaCheckCircle,
    FaTimesCircle
} from 'react-icons/fa';
const SignUpPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isNameValid = name.length >= 6;
    const isUsernameValid = username.length >= 6;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 8;
    return (
        <div className='w-full h-[100vh] flex items-center justify-center '>
            <div className='p-8 rounded-lg shadow-md bg-slate-950 w-96'>
                <h1 className='text-white font-bold text-2xl mb-6 text-center'>Sign Up</h1>
                <Input
                    type="text"
                    placeholder="Name"
                    icon={FaIdBadge}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Username"
                    icon={FaUser}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    icon={FaEnvelope}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    icon={FaLock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex flex-col gap-2 my-3'>
                    <ValidationItem
                        valid={isPasswordValid}
                        text="Password should be at least 8 characters"
                    />
                    <ValidationItem
                        valid={isEmailValid}
                        text="Email format is correct"
                    />
                    <ValidationItem
                        valid={isNameValid}
                        text="Name should be at least 6 characters"
                    />
                    <ValidationItem
                        valid={isUsernameValid}
                        text="Username should be at least 6 characters"
                    />
                </div>
                <button
                    disabled={!(isNameValid && isUsernameValid && isEmailValid && isPasswordValid)}
                    className='mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-md 
                    hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition'
                >
                    Create Account
                </button>
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
export default SignUpPage;