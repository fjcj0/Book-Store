import React, { useEffect, useState } from "react";
import CardDashboard from "../../components/CardDashboard";
import {
    FaBook,
    FaBookReader,
    FaClipboardList,
    FaUserGraduate,
} from "react-icons/fa";
import LineChartBorrowedBooks from "../../charts/LineChartBorrowedBooks";
import BarChartRequest from "../../charts/BarChartRequest";
import { useBookStore } from '../../store/bookStore.js';
import { useAuthStore } from '../../store/authStore.js';
const DashboardPage = () => {
    const {
        totalBooks,
        totalQuantity,
        totalBorrowedBooks,
        totalQuantityBook,
        totalBook,
        totalBorrowedBook
    } = useBookStore();
    const {
        totalUsers,
        totalUserIn
    } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchAll = async () => {
            try {
                await Promise.all([
                    totalBooks(),
                    totalQuantity(),
                    totalBorrowedBooks(),
                    totalUsers()
                ]);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAll();
    }, []);
    return (
        <div className="w-full">
            <div className="w-full flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
                    <CardDashboard icon={<FaUserGraduate />} name="Total Users" value={isLoading ? '...' : totalUserIn} />
                    <CardDashboard icon={<FaBook />} name="Total Books" value={totalBook} />
                    <CardDashboard icon={<FaBookReader />} name="Total Borrowed Books" value={isLoading ? '...' : totalBorrowedBook} />
                    <CardDashboard icon={<FaClipboardList />} name="Total Quantity Books" value={isLoading ? '...' : totalQuantityBook} />
                </div>
            </div>
            <div className="p-3 rounded-xl my-5 grid grid-cols-1">
                <div className="bg-base-300 p-5 my-5 rounded-md">
                    <h1 className="font-josefin font-bold text-sm">Total borrowed books last week</h1>
                    <div className="w-full h-full">
                        <LineChartBorrowedBooks />
                    </div>
                </div>
                <div className="bg-base-300 p-5 rounded-md">
                    <h1 className="font-josefin font-bold text-sm">Total requests last week</h1>
                    <div className="w-full h-full">
                        <BarChartRequest />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardPage;