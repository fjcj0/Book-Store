import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { day: 'Monday', booksBorrowed: 120 },
    { day: 'Tuesday', booksBorrowed: 98 },
    { day: 'Wednesday', booksBorrowed: 150 },
    { day: 'Thursday', booksBorrowed: 170 },
    { day: 'Friday', booksBorrowed: 200 },
    { day: 'Saturday', booksBorrowed: 80 },
    { day: 'Sunday', booksBorrowed: 60 },
];
const LineChartBorrowedBooks = () => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data} >
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <Line type="monotone" dataKey="booksBorrowed" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartBorrowedBooks;
