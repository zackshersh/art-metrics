import React, { useState } from 'react';

import "./TooltipStyles.css"

function Tooltip({text}) {

    const [visible, setVisible] = useState(true);
    return (
        <div style={{transform: 'translateX(-50%)'}} className='Tooltip p-2 bg-stone-800 rounded w-60 absolute top-[105%] z-50 shadow shadow-stone-500 after:shadow after:shadow-stone-500 left-1/2'>
            <p className='text-sm text-white text-center'>{text}</p>
        </div>
    );
}

export default Tooltip;