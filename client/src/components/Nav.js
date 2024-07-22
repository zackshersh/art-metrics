import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
    return (
        <nav className='bg-stone-200 w-full p-2 sticky top-0 left-0 flex justify-center'>
            <Link to={"/home"}><span>&#8592;</span> Home</Link>
        </nav>
    );
}

export default Nav;