import React from 'react';
const AddBookPage = () => {
    return (
        <div className='w-screen h-screen flex sm:justify-center justify-start items-center font-josefin'>
            <div className='bg-base-300 p-5 rounded-xl'>
                <h1 className='text-3xl font-mochiy'>Add <span className='text-yellow-400'>Book</span></h1>
                <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <input type="text" placeholder="Enter book name" className="input" />
                    <input type="number" placeholder='Enter quantity' className='input' />
                </div>
                <div className='my-2'>
                    <textarea className='input p-3 w-full h-[7rem]' placeholder='Enter description' ></textarea>
                </div>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Choose Picture</legend>
                    <input type="file" className="file-input" />
                    <label className="label">Max size 2MB</label>
                </fieldset>
                <button type='button' className='my-3 bg-yellow-400 hover:bg-yellow-600 duration-300 px-4 py-2 rounded-md text-base-300 font-bold'>Submit</button>
            </div>
        </div>
    );
};
export default AddBookPage;