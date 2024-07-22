import React from 'react';
import { Outlet } from 'react-router-dom';

function Root(props) {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Root;