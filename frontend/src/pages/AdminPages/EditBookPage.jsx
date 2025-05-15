import React from 'react';
const EditBookPage = () => {
    return (
        <div className='w-screen h-screen flex sm:justify-center justify-start items-center font-josefin'>
            <div className='bg-base-300 p-5 rounded-xl'>
                <h1 className='text-3xl font-mochiy'>Edit <span className='text-yellow-400'>Book</span></h1>
                <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <input type="text" placeholder="Change book name" className="input" />
                    <input type="number" placeholder='Change quantity' className='input' />
                </div>
                <div className='my-2'>
                    <textarea className='input p-3 w-full h-[7rem]' placeholder='Change description' ></textarea>
                </div>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Choose New Picture</legend>
                    <input type="file" className="file-input" />
                    <label className="label">Max size 2MB</label>
                </fieldset>
                <div className='flex items-center justify-center'>
                    <img src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D' className='my-3 w-[10rem] h-[10rem] rounded-xl' />
                </div>
                <button type='button' className='bg-yellow-400 hover:bg-yellow-600 duration-300 px-4 py-2 rounded-md text-base-300 font-bold'>Submit</button>
            </div>
        </div>
    );
};
export default EditBookPage;