import React from 'react';
import { Link } from 'react-router';
import { useAuthStore } from '../store/authStore.js';
const Sidebar = () => {
    const { logoutAdmin, isLoading } = useAuthStore();
    const logout = async (e) => {
        e.preventDefault();
        await logoutAdmin();
    };
    const links = [
        '/admin',
        '/admin/addbook',
        '/admin/editbooks',
        '/admin/requests',
        '/admin/borrowedbooks'
    ];
    const icons = [
        `<polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
         <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />`,
        `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
         <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />`,
        `<circle cx="12" cy="12" r="3" />
         <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 
         0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 
         0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 
         1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 
         9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 
         0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 
         1.65 0 0 0 .33-1.82 1.65 1.65 0 0 
         0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 
         1 2-2h.09A1.65 1.65 0 0 0 
         4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 
         0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 
         1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 
         2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 
         0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 
         0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 
         1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 
         1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 
         1.65 0 0 0-1.51 1z" />`,
        `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
         <path d="M13.73 21a2 2 0 0 1-3.46 0" />`,
        `<path d="M9 5h6" />
         <path d="M9 3h6a2 2 0 0 1 2 2v1H7V5a2 2 0 0 1 2-2z" />
         <rect x="4" y="7" width="16" height="14" rx="2" />
         <path d="M9 12h6" />
         <path d="M9 16h6" />`
    ];

    return (
        <div className='fixed z-50'>
            <aside className="relative flex flex-col items-center bg-white text-gray-700 shadow h-screen">
                <div className="h-16 flex items-center w-full">
                    <div className="h-6 w-6 mx-auto">
                        <img
                            className="h-6 w-6 mx-auto rounded-full"
                            src="/zust.png"
                            alt="zust logo"
                        />
                    </div>
                </div>
                <ul>
                    {icons.map((svgContent, index) => (
                        <li key={index} className="hover:bg-gray-100">
                            <Link to={links[index]}
                                className="h-16 px-6 flex justify-center items-center w-full focus:text-orange-500"
                                dangerouslySetInnerHTML={{
                                    __html: `<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">${svgContent}</svg>`
                                }}
                            />
                        </li>
                    ))}
                </ul>
                <div className="mt-auto h-16 flex items-center w-full">
                    <button
                        onClick={logout}
                        disabled={isLoading}
                        className={`h-16 mx-auto flex justify-center items-center w-full bg-blue-500 hover:bg-blue-800 duration-300 ${isLoading ? 'opacity-50' : ''}`}>
                        <svg
                            className="h-5 w-5 text-white font-bold"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                </div>
            </aside>
        </div>
    );
};
export default Sidebar;