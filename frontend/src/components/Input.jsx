import React from 'react';
const Input = ({ type, icon: Icon, placeholder, value, onChange }) => {
    return (
        <div className='flex items-center gap-2 my-2 border bg-slate-900 rounded-md px-3 py-2'>
            {Icon && <Icon className="text-green-500 text-lg" />}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='outline-none w-full bg-transparent font-thin text-white'
            />
        </div>
    );
};
export default Input;