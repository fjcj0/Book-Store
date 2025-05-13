import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
const AdminLayout = () => {
    return (
        <div className='w-screen h-screen flex'>
            <Sidebar />
            <main className='p-3 w-[100%]'>
                <Outlet />
            </main>
        </div>
    );
}
export default AdminLayout;