import React from 'react';
import { Outlet } from 'react-router-dom';

import { Analytics } from '@vercel/analytics/react';

function Root(props) {
    return (
        <div>
            <Outlet />
            <Analytics />
        </div>
    );
}

export default Root;