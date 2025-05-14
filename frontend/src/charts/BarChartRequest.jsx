import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { day: 'Monday', total: 120 },
    { day: 'Tuesday', total: 98 },
    { day: 'Wednesday', total: 150 },
    { day: 'Thursday', total: 170 },
    { day: 'Friday', total: 200 },
    { day: 'Saturday', total: 80 },
    { day: 'Sunday', total: 60 },
];

const BarChartRequest = () => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default BarChartRequest;