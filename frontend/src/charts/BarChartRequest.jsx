import React, { useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useRequestStore } from '../store/requestStore.js';
const BarChartRequest = () => {
    const { requestsLastWeek, getWeeklyRequestStats } = useRequestStore();
    useEffect(() => {
        getWeeklyRequestStats();
    }, []);
    console.log(requestsLastWeek);
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={requestsLastWeek} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default BarChartRequest;