import { style } from 'd3';
import React, { useEffect, useState } from 'react';

import "./RangeInputSlider2.css"
import { rangeInputShadow } from './boxShadowStyles';
import { scale } from '../utils/utils';

function RangeInputSlider2({ value, handler, min, max, vertical, gradientColors}) {

    // const [ value, setValue ] = useState(0);

    // useEffect(() => {
    //     // handler(value);
    //     // console.log(value)
    // },[value])

    const styles = vertical ? {
        writingMode: "vertical-lr",
        direction: "rtl",
        appearance: "slider-vertical",
        width: "16px",
        verticalAlign: "bottom",
        height: "280px",

    } : {
        width: "100%",
    
    }

    const resetStyles = {
        WebkitAppearance: "none",
        appearance: "none",
        background: "transparent",
        cursor: "pointer",
        width: "15rem",
    }


    const tickLineLength = window.innerWidth * 2;

    const generateTicks = () => {
        let arr = [];

        let yOff = 20;
        let tickCount = 256;

        for(var i=0; i<tickCount; i++){
            let x = i / tickCount;
            x *= tickLineLength;
            let h = !(i % 5) ? 10 : 6;
            
            arr.push(
                <line key={i+1} x1={x} y1={yOff} x2={x} y2={yOff - h} stroke='rgb(255, 150, 150)' strokeWidth={1.5}></line>
            )
        }

        arr.push(
            <line key={0} x1={0} y1={yOff} x2={tickLineLength} y2={yOff} stroke='rgb(255, 150, 150)' strokeWidth={1.2}></line>
        )

        return arr;
    }

    return (
        <div className='relative'>
            <input className='relative z-10 h-8' style={{...styles}} type='range' step={0.01} min={min} max={max} value={value} onChange={(e) => {
                // setValue(e.target.value);
                handler(e.target.value)
            }}/>

            {/* #### TRACK #### */}
            <div style={{
                boxShadow: rangeInputShadow.boxShadow
            }}
             className='absolute top-0 w-full min-h-[28px] max-h-[28px] overflow-hidden rounded-md border border-stone-400 bg-stone-100 z-0'>
                <svg style={{
                    transform: `translateX(${scale(value, -1, 1, 0, (tickLineLength / 1.3)-(window.innerWidth / 2)) * -0.2}px)`
                }} width={tickLineLength} height={30}>
                    {generateTicks()}
                </svg>
            </div>

        </div>
    );
}

export default RangeInputSlider2;