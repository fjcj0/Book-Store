import React from 'react';

const About = () => {
    return (
        <section className="py-24 relative bg-white" id='about'>
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                    <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                        <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                            <img
                                className="rounded-xl object-cover"
                                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
                                alt="About us image 1"
                            />
                        </div>
                        <img
                            className="sm:ml-0 ml-auto rounded-xl object-cover"
                            src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="About us image 2"
                        />
                    </div>
                    <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                        <div className="w-full flex-col justify-center items-start gap-8 flex">
                            <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                <h2 className="text-green-500 font-mochiy text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                    Best Website To Customize <span className='text-red-700'>Students</span>
                                </h2>
                                <p className="text-black font-josefin text-base font-normal leading-relaxed lg:text-start text-center">
                                    Every project we've undertaken has been a collaborative effort, where every person
                                    involved has left their mark. Together, we've not only constructed buildings but also
                                    built enduring connections that define our success story.
                                </p>
                            </div>
                            <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">33+</h3>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Years of Experience</h6>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">125+</h4>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Successful Projects</h6>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">52+</h4>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Happy Clients</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default About;