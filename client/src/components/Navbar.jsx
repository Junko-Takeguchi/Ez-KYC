import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as i18n from 'i18next';

const languages = [
    { value: '', text: 'Options' },
    { value: 'en', text: 'English' },
    { value: 'hi-IN', text: 'Hindi' },
    { value: 'bn-IN', text: 'Bengali' },
    { value: 'gu-IN', text: 'Gujrati' },
    { value: 'kn-IN', text: 'Kannada' },
    { value: 'ml-IN', text: 'Malayalam' },
    { value: 'mr-IN', text: 'Marathi' },
];

const Navbar = ({ lang, handleChange }) => {
    return (
        <div className='flex z-10 justify-between itmes-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
            <h1 className='w-full text-3xl font-bold text-[#f8b24f]'>Ez-KYC</h1>
            <ul className='md:flex'>
                <Link to={"/"} className="sm:w-60 h-16 overflow-hidden -ml-5" ><li className='p-4'>Home</li></Link>
                <Link to={"/kyc"} className="sm:w-60 h-16 overflow-hidden -ml-5" ><li className='p-4'>KYC</li></Link>
                <select value={lang} className="bg-black text-white" onChange={handleChange}>
                    {languages.map((item) => {
                        return (
                            <option
                                key={item.value}
                                value={item.value}
                            >
                                {item.text}
                            </option>
                        );
                    })}
                </select>
            </ul>
        </div>
    )
}

export default Navbar;
