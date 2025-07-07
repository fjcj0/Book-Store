import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore.js';
import Loader from '../../tools/Loader.jsx';
const UserDashboardPage = () => {
    const [newName, setNewName] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const { user } = useAuthStore();
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfilePicture(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    const { isLoading, error, editUser } = useAuthStore();
    const Submit = async (e) => {
        e.preventDefault();
        await editUser(user._id, newUserName, newName, newProfilePicture);
        setPreviewImage(null);
    };
    return (
        <div>
            <div className='my-5 flex items-center justify-center'>
                <div className='bg-green-800 p-4 rounded-md'>
                    <h1 className='text-center font-bold font-mochiy text-3xl mb-4'>Information</h1>
                    <div className='flex flex-col items-start justify-start gap-4 font-josefin'>
                        {
                            user.profilePicture !== '/' ?
                                <img
                                    src={user.profilePicture}
                                    alt="Profile"
                                    className="w-[5rem] h-[5rem] rounded-full object-cover mx-auto"
                                /> : ''
                        }
                        <p>Name: {user.name}</p>
                        <p>UserName: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>LastLogin: {user.lastLogin}</p>
                    </div>
                </div>
            </div>
            <div className='my-5 p-3 flex-col items-start justify-start w-screen bg-green-700'>
                <h1 className='text-center font-bold font-mochiy text-3xl mb-4'>Edit Information</h1>
                <div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col font-josefin'>
                            <p className='text-sm'>Name</p>
                            <input
                                type='text'
                                defaultValue={user.name}
                                placeholder='Change your name'
                                className='p-2 rounded-md bg-white text-black'
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col font-josefin'>
                            <p className='text-sm'>UserName</p>
                            <input
                                type='text'
                                defaultValue={user.username}
                                placeholder='Change your UserName'
                                className='p-2 rounded-md bg-white text-black'
                                onChange={(e) => setNewUserName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex-col items-center justify-center my-3 font-josefin'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                            Change Profile Picture
                        </label>
                        <input
                            className="block w-full text-sm p-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            onChange={handleProfilePictureChange}
                        />
                        <p className="mt-1 text-sm text-white" id="file_input_help">
                            SVG, PNG, JPG or GIF (MAX. 800x400px).
                        </p>
                        {previewImage && (
                            <div className="mt-3 flex justify-center">
                                <img
                                    src={previewImage}
                                    alt="Selected Preview"
                                    className="w-[5rem] h-[5rem] rounded-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                    <button
                        onClick={Submit}
                        disabled={isLoading}
                        type='button'
                        className={`py-2 px-4 bg-yellow-400 font-josefin font-bold rounded-md text-black hover:bg-yellow-600 duration-300 ease ${isLoading ? 'opacity-50' : ''}`}
                    >
                        {isLoading ? <Loader /> : 'Submit'}
                    </button>
                    <p className='text-sm mt-4 text-red-600 font-josefin'>{error}</p>
                </div>
            </div>
            <div>
                <h1 className='text-center font-bold font-mochiy text-3xl '>borrowed books</h1>
                <div className='flex items-start justify-start'>
                    <div className='w-[20rem] h-[20rem] bg-white m-3 rounded-xl'>
                        <div className='w-full h-[60%]'>
                            <img
                                src='https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D'
                                className='w-full h-full object-cover rounded-t-xl'
                                alt="Book cover"
                            />
                        </div>
                        <div className='flex flex-col justify-between h-[40%] w-full py-3'>
                            <div className='name'>
                                <p className='font-josefin text-black mx-3 font-bold text-2xl'> Sandrella</p>
                            </div>
                            <div className='statusandtime font-josefin flex items-center justify-between text-black'>
                                <p className='mx-3 text-yellow-500'>Pending</p>
                                <p className='mx-3'>12/2/2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserDashboardPage;