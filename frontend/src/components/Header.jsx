import React, { useState } from 'react';
import { UserCircleIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
import useSlideStore from '../store/SlideStore';
import { useAuthStore } from '../store/authStore.js';
const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const openSlide = useSlideStore((state) => state.openSlide);
    const { logout, user, isAuthenticated } = useAuthStore();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
        } catch (error) {
            console.log(error.message);
        }
    };
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
                <button
                    onClick={openSlide}
                    className="relative text-gray-700 hover:text-black bottom-[0.20rem]"
                >
                    <BookmarkIcon className="h-6 w-6" />
                </button>
                {
                    isAuthenticated && user.isVerified ?
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="text-gray-700 hover:text-black focus:outline-none"
                            >
                                <UserCircleIcon className="h-7 w-7" />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 text-black shadow-md rounded-md text-sm z-50">
                                    <Link to="/user/dashboard" className="block px-4 py-2 hover:bg-gray-50">Dashboard</Link>
                                    <button type='button' className=" w-[100%] py-2 flex px-4 items-start hover:bg-gray-50" onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div> :
                        <button className='px-4 py-2 bg-emerald-500 hover:bg-emerald-800 duration-300 ease rounded-md font-josefin'><Link to='/signin'>Login</Link></button>
                }
            </div>
        </header>
    );
};
export default Header;