import React from 'react';
import { Link } from 'react-router-dom';
import { softDropShadow } from './boxShadowStyles';

import { useNavigate } from 'react-router-dom';

import logo from "../assets/images/logo.png"

function Nav(props) {

    const navigate = useNavigate();

    const navigateToTitle = () => {
        console.log('sfe')
        navigate("/")
    }

    const navigateToAbout = () => {
        navigate("/about")
    }

    return (
        <nav style={{boxShadow: softDropShadow}} className='flex items-center justify-between p-3 px-6 bg-stone-200 border-b border-stone-300 '>
            <div onMouseDown={navigateToTitle} className='flex items-center cursor-pointer'>
                <img className='w-[1.5rem] h-[1.5rem] mr-4' src={logo} />
                <h1  className='font-bold text-2xl'>Expressive Metrics</h1>
            </div>
            <div onMouseDown={navigateToAbout} className='flex justify-center items-center border-2 border-black rounded-full w-[32px] h-[32px] cursor-pointer hover:opacity-60'>
                <p className='font-bold text-xl'>?</p>
            </div>
        </nav>
    );
}

export default Nav;