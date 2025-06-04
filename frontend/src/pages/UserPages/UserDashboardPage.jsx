import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore.js';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
const UserDashboardPage = () => {
    const [newName, setNewName] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const { user } = useAuthStore();
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfilePicture(file);
        }
    };
    return (
        <div>
            <div className='my-5 flex items-center justify-center'>
                <div className='bg-green-800 p-4 rounded-md'>
                    <h1 className='text-center font-bold font-mochiy text-3xl mb-4'>Information</h1>
                    <div className='flex flex-col items-start justify-start gap-2 font-josefin'>
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
                            <input type='text' defaultValue={user.name} placeholder='Change your name' className='p-2 rounded-md bg-white text-black'
                                onChange={(e) => setNewName(e.target.value)} />
                        </div>
                        <div className='flex flex-col font-josefin'>
                            <p className='text-sm'>UserName</p>
                            <input type='text' defaultValue={user.username} placeholder='Change your UserName' className='p-2 rounded-md bg-white text-black'
                                onChange={(e) => setNewUserName(e.target.value)} />
                        </div>
                    </div>
                    <div className='flex-col items-center justify-center my-3 font-josefin'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                            Change Profile Picture
                        </label>
                        <input
                            className="block w-full text-sm p-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            onChange={handleProfilePictureChange}
                        />
                        <p className="mt-1 text-sm text-white" id="file_input_help">
                            SVG, PNG, JPG or GIF (MAX. 800x400px).
                        </p>
                    </div>
                    <button type='button' className='py-2 px-4 bg-yellow-400 font-josefin font-bold rounded-md text-black hover:bg-yellow-600 duration-300 ease'>Submit</button>
                </div>
            </div>
        </div>
    );
};
export default UserDashboardPage;