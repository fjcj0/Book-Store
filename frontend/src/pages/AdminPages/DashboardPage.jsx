import React from 'react';
import CardDashboard from '../../components/CardDashboard';
import { FaBook, FaBookReader, FaClipboardList, FaUserGraduate } from 'react-icons/fa';
const DashboardPage = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                <CardDashboard
                    icon={<FaUserGraduate />}
                    name="Total Students"
                    value="200"
                />
                <CardDashboard
                    icon={<FaBook />}
                    name="Total Books"
                    value="500"
                />
                <CardDashboard
                    icon={<FaBookReader />}
                    name="Not Backed"
                    value="120"
                />
                <CardDashboard
                    icon={<FaClipboardList />}
                    name="Total Quantity"
                    value="3000"
                />
            </div>
        </div>
    );
}
export default DashboardPage;