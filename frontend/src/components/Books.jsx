import React from 'react';

import BookCard from './BookCard';
const Books = () => {
    return (
        <div className='py-20' id='books'>
            <h1 className='font-bold text-center text-3xl font-mochiy'>Our <span className='text-green-500'>Books</span></h1>
            <div className='my-5 flex px-16  justify-start'>
                <label className="input border border-green-600 rounded-xl">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" className=" grow" placeholder="Search" />
                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
            </div>
            <div className='my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[95%] mx-auto'>
                <BookCard name={'Sndrella'} description={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quo unde tempore vitae incidunt consequatur quia quidem adipisci iure. Alias corrupti iure amet quaerat voluptatibus rem. Expedita odit modi debitis.'} img={'https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D'} />
            </div>
        </div >
    );
};
export default Books;