import React, { useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useBookStore } from '../store/bookStore.js';
const LineChartBorrowedBooks = () => {
    const { getWeeklyBorrowedBookStats, borrowedBooksLastWeek } = useBookStore();
    useEffect(() => {
        getWeeklyBorrowedBookStats();
    }, []);
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={borrowedBooksLastWeek}
                    margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
export default LineChartBorrowedBooks;