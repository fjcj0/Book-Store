import React from 'react';

const CardDashboard = ({ name, value, icon }) => {
    return (
        <div className="px-3 py-10 w-[20rem] md:w-[20rem] lg:w-[20rem] xl:w-[23rem] rounded-xl bg-white flex items-center justify-between">
            <div className="text-green-500 text-3xl">
                {icon}
            </div>
            <div className="flex flex-col items-start gap-3 font-josefin justify-between text-black font-bold text-2xl">
                <p>{name}</p>
                <p>{value}</p>
            </div>
        </div>
    );
};

export default CardDashboard;
