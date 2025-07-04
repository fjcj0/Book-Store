import React, { useState } from 'react';

const EditBookPage = () => {
    const [newName, setNewName] = useState('');
    const [newQuantity, setNewQuantity] = useState(0);
    const [newDescription, setNewDescription] = useState('');
    const [picture, setPicture] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPicture(file);
    };
    return (
        <div className='w-screen h-screen flex sm:justify-center justify-start items-center font-josefin'>
            <div className='bg-base-300 p-5 rounded-xl w-[90%] max-w-[700px]'>
                <h1 className='text-3xl font-mochiy'>
                    Edit <span className='text-yellow-400'>Book</span>
                </h1>
                <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <input
                        type="text"
                        placeholder="Change book name"
                        className="input"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder='Change quantity'
                        className='input'
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(Number(e.target.value))}
                    />
                </div>
                <div className='my-2'>
                    <textarea
                        className='input p-3 w-full h-[7rem]'
                        placeholder='Change description'
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </div>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Choose New Picture</legend>
                    <input
                        type="file"
                        className="file-input"
                        onChange={handleImageChange}
                    />
                    <label className="label">Max size 2MB</label>
                </fieldset>
                {picture && (
                    <div className='flex items-center justify-center'>
                        <img
                            src={URL.createObjectURL(picture)}
                            alt="Preview"
                            className='my-3 w-[10rem] h-[10rem] rounded-xl object-cover'
                        />
                    </div>
                )}
                <button
                    type='button'
                    className='bg-yellow-400 hover:bg-yellow-600 duration-300 px-4 py-2 rounded-md text-base-300 font-bold'>
                    Submit
                </button>
            </div>
        </div>
    );
};
export default EditBookPage;