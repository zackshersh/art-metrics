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

    return (
        <nav style={{boxShadow: softDropShadow}} className='flex p-3 bg-stone-200 border-b border-stone-300 '>
            <h1 onMouseDown={navigateToTitle} className='font-bold text-xl'>Art Metrics</h1>
        </nav>
    );
}

export default Nav;