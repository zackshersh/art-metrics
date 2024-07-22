import React, { useEffect, useMemo, useRef, useState } from 'react';
import { scale } from '../utils/utils';
import { useWindowSize } from '../utils/hooks';

function RangeInputSlider({handler, max, min, gradientColors, vertical=false, fullHeight}) {

    const sizingRef = useRef();
    const [bounds, setBounds] = useState(undefined);

    const [value, setValue] = useState(0);
    const [mouseIsDown, setMouseIsDown] = useState(false);
    const [mouseIsHere, setMouseIsHere] = useState(false);


    const getSliderPos = () => {
        let pos = scale(value, min, max, 0, fullHeight);
        return pos;
    }
    const [sliderPos, setSliderPos] = useState(getSliderPos());

    // const [fullHeight, setFullHeight] = useState(0);

    const sliderHeight = 18;

    const divisions = 60;
    const range = useMemo(() => max-min);

    useEffect(() => {
        // if(sizingRef.current){
        //     setBounds(sizingRef.current.getBoundingClientRect())
        //     console.log(sizingRef.current.getBoundingClientRect().height)
        //     setFullHeight(sizingRef.current.getBoundingClientRect().height)
        // };
        // console.log(fullHeight)

    },[useWindowSize(),sizingRef])

    useEffect(() => {
        setSliderPos(getSliderPos());
        handler(value)
    },[value])

    useEffect(() => {
        setSliderPos(getSliderPos());
    })

    const progressListeners = () => {

        // if(!bounds) return;

        let arr = [];
        let step = fullHeight/divisions;

        const handler = (e) => {
            if((mouseIsDown) || e.type == "mousedown"){
                let index = e.target.dataset.index
                let v = range*(index/(divisions-1));
                v = scale(v, 0, range, -1, 1);
                setValue(v)
            }
        }


        for(var i=0; i<divisions; i++){

            let transY = 0;
            if(i == 0 && mouseIsDown) transY = 1000;

            let height = step;
            if((i == 0 || i == divisions-1) && mouseIsDown) height = 1000 + step;
            arr.push(<div 
                style={{minHeight: height, minWidth: mouseIsDown ? 2000 : "auto", transform: mouseIsDown ? `translateX(-${1000}px) translateY(-${1000}px)` : ""}}
                onMouseEnter={handler}
                onMouseDown={handler}
                onMouseUp={() => {setMouseIsDown(false)}}
                onMouseLeave={(e) => {
                    let index = e.target.dataset.index;

                    if(index == 0 || index == divisions-1){
                        setMouseIsHere(false)
                    }
                }}
                className=''
                key={i}
                data-index={i}
                ></div>)
        }

        return arr;
    }








    const thumbStyles = {
        boxShadow: "rgba(255, 255, 255, 0.2) 0 1px 2px 0 inset, rgba(0, 0, 0, 0.1) 0 2px 2px 0",
        backgroundImage: "linear-gradient(180deg, rgba(206, 211, 234, 0.13) 0%, transparent 100%)",
    
    }

    return (
        <div ref={sizingRef} className={`${mouseIsDown ? "z-20" : "z-10"}`}>

            <div  
                onMouseDown={() => setMouseIsDown(true)} 
                onMouseUp={() => setMouseIsDown(false)} 
                onMouseLeave={() => {setMouseIsHere(false)}}
                onMouseEnter={() => {setMouseIsHere(true)}}
                style={{
                    background: `linear-gradient(${gradientColors.start}, ${gradientColors.end})`,
                    // transform: vertical ? "" : "rotate(90deg)",
                    minHeight: fullHeight,
                    maxHeight: fullHeight,
                    boxShadow: "inset 0 2px 4px rgb(0,0,0,0.5)"
                    
                }}
                className={` w-6 relative rounded-md`}>

                {progressListeners()}

                <div style={{
                    minHeight: sliderHeight,
                    top: sliderPos - (sliderHeight/2),
                    transform: "translateX(-0.75rem)",
                    pointerEvents: "none",
                    ...thumbStyles
                }} className='bg-stone-300 border border-stone-400 rounded-md absolute w-12'></div>

            </div>
        </div>
    );
}

export default RangeInputSlider;



