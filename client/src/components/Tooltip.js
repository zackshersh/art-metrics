import React, { useEffect, useState } from 'react';

import "./TooltipStyles.css"
import { lsRetrieve, lsStore } from '../utils/localStorage';

function Tooltip({text, parentShow, id}) {

    const [opacity, setOpacity] = useState(100);
    const [visible, setVisible] = useState(false);

    useEffect(() => {        
        if(!parentShow){
            setVisible(false);
            hideElement()
        }
    },[parentShow]);

    // natural fade out
    useEffect(() => {

        let visited = lsRetrieve(`tooltip-${id}`);

        if(!visited){

            setVisible(true);
            setTimeout(() => {
                hideElement();
            },8000)

            lsStore(`tooltip-${id}`, true);
        }


    },[])

    const hideElement = () => {
        setOpacity(0);
        setTimeout(() => {
            setVisible(false);
        },1000)
    }

    return (
        <div style={{transform: 'translateX(-50%)', opacity: opacity}} className={`Tooltip p-2 bg-stone-800 rounded absolute top-[105%] z-50 shadow shadow-stone-500 after:shadow after:shadow-stone-500 left-1/2 ${visible ? "" : "hidden"}`}>
            <p className='text-sm text-white text-center max-w-64'>{text}</p>
        </div>
    );
}

export default Tooltip;