import React, { useState } from 'react';
import { UserCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <header className='flex items-center justify-between px-16 py-5 border-b bg-white border-gray-500'>
            <div>
                <Link to={'/'}>
                    <img src='/zust.png' className='rounded-full w-[3.5rem] h-[3.5rem]' alt='Logo' />
                </Link>
            </div>
            <nav className="hidden md:flex items-start justify-start gap-4 font-josefin text-md font-light text-black">
                <a href="#home" className="hover:text-orange-950 duration-200">Home</a>
                <a href="#about" className="hover:text-orange-950 duration-200">About</a>
                <a href="#books" className="hover:text-orange-950 duration-200">Books</a>
                <a href="#contact" className="hover:text-orange-950 duration-200">Contact</a>
            </nav>
            <div className='flex items-center gap-4 relative'>
                <button className="relative text-gray-700 hover:text-black bottom-[0.20rem]">
                    <BookmarkIcon className="h-6 w-6" />
                </button>
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="text-gray-700 hover:text-black focus:outline-none"
                    >
                        <UserCircleIcon className="h-7 w-7" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 text-black shadow-md rounded-md text-sm z-50">
                            <a href="#" className="block px-4 py-2 hover:bg-gray-50">Profile</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-50">Settings</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-50">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
export default Header;