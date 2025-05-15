import React from 'react';
import { Link } from 'react-router-dom';
import useSlideStore from '../store/SlideStore';
const Slide = () => {
    const { isSlideOpen, closeSlide } = useSlideStore();
    return (
        <div
            className={`
        fixed top-0 left-0 h-screen w-[18rem] bg-base-300 z-50
        transform transition-transform duration-300 ease-in-out
        ${isSlideOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
        >
            <div className='p-3 flex items-end justify-end'>
                <button type='button' className='btn btn-error' onClick={closeSlide}>X</button>
            </div>
            <div className='flex-col items-start justify-center gap-5 p-5'>
                <div className='flex flex-col items-center justify-center text-center gap-10'>
                    <div className='flex flex-col items-center justify-center gap-5'>
                        <img
                            src='https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=900&auto=format&fit=crop&q=60'
                            className='w-[5rem] h-[5rem] rounded-full'
                            alt='Profile'
                        />
                        <h1 className='font-mochiy font-bold'>Sandrella</h1>
                        <div className='flex items-center justify-center gap-3'>
                            <Link to={''}><button className='btn btn-primary'>View</button></Link>
                            <button className='btn btn-error'>Remove</button>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-5'>
                        <img
                            src='https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=900&auto=format&fit=crop&q=60'
                            className='w-[5rem] h-[5rem] rounded-full'
                            alt='Profile'
                        />
                        <h1 className='font-mochiy font-bold'>Sandrella</h1>
                        <div className='flex items-center justify-center gap-3'>
                            <Link to={''}><button className='btn btn-primary'>View</button></Link>
                            <button className='btn btn-error'>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Slide;