import React, { useState } from 'react';

function PopupWrapper({active, setActive, children}) {

    const handleClose = () => {
        setActive(false)
    }

    return (
        <div onMouseDown={handleClose} className={`${active ? "" : "hidden"} absolute top-0 left-0 min-w-full min-h-full bg-[rgba(0,0,0,0.2)] z-50 flex justify-center items-center`}>
            <div className='max-w-[600px] max-h-5/6 w-full bg-stone-50 p-6 rounded-md'>
                {children}
            </div>
        </div>
    );
}

export default PopupWrapper;