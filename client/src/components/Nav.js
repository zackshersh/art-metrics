import React from 'react';
import { Link } from 'react-router-dom';
import { softDropShadow } from './boxShadowStyles';

import { useNavigate } from 'react-router-dom';

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
            <h1 onMouseDown={navigateToTitle} className='font-bold text-xl cursor-pointer'>Subjective Metrics</h1>
            <div onMouseDown={navigateToAbout} className='flex justify-center items-center border-2 border-black rounded-full w-[32px] h-[32px] cursor-pointer hover:opacity-60'>
                <p className='font-bold text-xl'>?</p>
            </div>
        </nav>
    );
}

export default Nav;