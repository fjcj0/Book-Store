import React from 'react';
import Lottie from 'lottie-react';
import BookAnimation from '../../animations/BookAnimation.json';
const Home = () => {
    return (
        <div className='' id='home'>
            <div className="hero py-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="hidden lg:block w-[300px] lg:w-[500px]">
                        <Lottie animationData={BookAnimation} loop={true} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold font-slab">
                            Welcome To <span className='text-green-500'>Zust Library</span>
                        </h1>
                        <p className="py-6 max-w-[80%] font-josefin">
                            Here you can find all types of books that in Zust University easily. Just be careful when you borrow a book and return it on time.
                        </p>
                        <a href='#books' className="bg-green-600 hover:bg-green-900 duration-200 text-white rounded-md px-3 py-3 font-josefin font-bold">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;