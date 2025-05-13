import React from 'react';
import "cally";
const BookPage = () => {
    return (
        <div className='w-full flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-3xl lg:max-w-none lg:w-[95%] bg-white lg:rounded-md h-auto lg:h-[45rem] flex flex-col lg:flex-row items-center justify-between'>
                <div className='h-full p-3 flex w-full lg:w-[50%] items-start justify-center'>
                    <img src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=1600&auto=format&fit=crop&q=60"
                        className='object-cover rounded-md w-full max-h-96 lg:max-h-full'
                        alt="Book Cover" />
                </div>
                <div className='w-full lg:w-[50%] h-full flex flex-col items-start justify-center p-3'>
                    <h1 className='font-bold text-green-500 text-3xl font-mochiy'>Sndrella</h1>
                    <p className='text-black my-3 font-josefin text-sm'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque voluptatibus nam a odit eius facilis sunt, aperiam magnam aliquam, animi facere! Iusto, consequatur. Veritatis optio quas quo voluptatem, fugiat totam.
                    </p>
                    <button type='button' className='bg-green-600 hover:bg-green-900 px-2 py-3 text-white font-bold font-poppins rounded-md duration-300'>
                        Add to cart
                    </button>
                    <div className='flex flex-col sm:flex-row items-start justify-start gap-3 my-3'>
                        <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
                            <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
                            <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
                            <calendar-month></calendar-month>
                        </calendar-date>
                        <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
                            <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
                            <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
                            <calendar-month></calendar-month>
                        </calendar-date>
                    </div>
                    <button type='button' className='px-4 py-3 bg-blue-600 hover:bg-blue-900 text-white font-bold font-poppins rounded-md duration-300'>
                        Borrow Book
                    </button>
                </div>
            </div>
        </div>
    );
};
export default BookPage;