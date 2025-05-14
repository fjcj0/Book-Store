import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
const AdminLayout = () => {
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