import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Loader from '../tools/Loader';
import { useAuthStore } from '../store/authStore.js';
const AdminLayout = () => {
    const { isCheckingAuthAdmin } = useAuthStore();
    if (isCheckingAuthAdmin) return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Loader />
        </div>
    );
    return (
        <div className='w-screen h-screen flex'>
            <Sidebar />
            <main className="absolute p-3 right-0 w-[calc(100%-4rem)]">
                <Outlet />
            </main>
        </div>
    );
}
export default AdminLayout;