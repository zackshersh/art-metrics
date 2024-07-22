import React, { useEffect, useState } from 'react';
import SvgDynamicIcon from './SvgDynamicIcon';
import { lerp } from '../utils/utils';

function DynamicIconWrapper({valueName, value, t}) {

    // const [value, setValue] = useState(0);

    // const [startVal, setStartVal] = useState(-1);
    // const [endVal, setEndVal] = useState(1);

    // const [lastT, setLastT] = useState(0);

    // useEffect(() => {

    //     let dif = t - lastT;
    //     console.log(dif)
    //     setLastT(t);
    //     if(dif < 0){
    //         setStartVal(endVal);

            
    //         setEndVal(Math.random() > 0.5 ? 1 : -1);
    //     }
    //     setValue(t);
    // }, [t])

    return (
        <div>
            <SvgDynamicIcon valueName={valueName} value={value} scaleFactor={1.5} />
        </div>
    );
}

export default DynamicIconWrapper;