import React from "react";
import CardDashboard from "../../components/CardDashboard";
import {
    FaBook,
    FaBookReader,
    FaClipboardList,
    FaUserGraduate,
} from "react-icons/fa";
import LineChartBorrowedBooks from "../../charts/LineChartBorrowedBooks";
import BarChartRequest from "../../charts/BarChartRequest";
const DashboardPage = () => {
    return (
        <div className="w-full">
            <div className="w-full flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <CardDashboard
                        icon={<FaUserGraduate />}
                        name="Total Students"
                        value="200"
                    />
                    <CardDashboard icon={<FaBook />} name="Total Books" value="500" />
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
            <div className="bg-base-300 p-3 rounded-xl my-5 gap-3 grid grid-cols-1 sm:grid-cols-2">
                <div>
                    <h1 className="font-josefin font-bold text-sm">
                        Total borrowed books last week
                    </h1>
                    <div className="w-[100%] h-[100%]">
                        <LineChartBorrowedBooks />
                    </div>
                </div>
                <div>
                    <h1 className="font-josefin font-bold text-sm">
                        Total requests last week
                    </h1>
                    <div className="w-[100%] h-[100%]">
                        <BarChartRequest />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardPage;
