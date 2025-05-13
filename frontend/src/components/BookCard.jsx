import React from 'react';
import { Link } from 'react-router';
const BookCard = ({ name, description, img }) => {
    return (
        <div className='w-[20rem] h-[30rem] rounded-md bg-white flex flex-col'>
            <div className='w-full h-[50%] flex items-center justify-center'>
                <img
                    src={img}
                    className='object-cover w-full h-full rounded-t-md'
                    alt="Book Cover"
                />
            </div>
            <div className='h-[50%] px-3 py-2 bg-green-50 rounded-b-md flex flex-col justify-between'>
                <div>
                    <h1 className='text-green-400 font-bold font-mochiy text-2xl'>{name}</h1>
                    <p className='font-josefin mt-3 text-black text-sm'>
                        {description}
                    </p>
                </div>
                <Link
                    className='py-2 px-4 bg-green-700 duration-200 hover:bg-green-900 text-white rounded-xl font-bold font-poppins mt-3 w-fit self-start'
                    to="/book-detail"
                >
                    View
                </Link>
            </div>
        </div>
    );
};
export default BookCard;