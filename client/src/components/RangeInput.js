import React, { useEffect, useMemo, useRef, useState } from 'react';
import RangeInputSlider from './RangeInputSlider';
import { clamp, getMetricColors } from '../utils/utils';
import RangeSliderLabel from './RangeSliderLabel';

import { useWindowSize } from '../utils/hooks';
import RangeInputSlider2 from './RangeInputSlider2';
import RangeSliderDisplay from './RangeSliderDisplay';

function RangeInput({name, value, setValue, minLabel, maxLabel, min=-1, max=1, incrementRatedCount, verticalLayout, verticallyCompact}) {

    const [hasInteracted, setHasInteracted] = useState(false);
    const [startPercent, setStartPercent] = useState(0);
    const [endPercent, setEndPercent] = useState(0);

    const getSliderLength = () => {

        return verticalLayout ? window.innerHeight/7 : Math.max(window.innerHeight/3,200)
    }
    const [sliderLength, setSliderLength] = useState(getSliderLength());

    const contRef = useRef();

    useEffect(() => {
        // let bounds = contRef.current.getBoundingClientRect();
        // setSliderLength(verticalLayout ? Math.floor(bounds.height) : Math.floor(bounds.height))
        // console.log(bounds.height)
        setSliderLength(getSliderLength())
    }, [useWindowSize()])

    useEffect(() => {
        setSliderLength(getSliderLength())
    })



    const colors = useMemo(() => {
        return getMetricColors(name);
    })


    const handleChange = (val) => {

        setValue(val, name);
        // ratedCount has been reset but hasInteracted hasn't yet
        if(!hasInteracted){
            setHasInteracted(true);
            // incrementRatedCount();
        }
    }
    

    useEffect(() => {

        let startPercent = clamp(value, -1, 0).toFixed(2) * -100;
        setStartPercent(startPercent);

        let endPercent = clamp(value, 0, 1).toFixed(2) * 100;
        setEndPercent(endPercent);



    },[value])

    const vertical = () => {
        return (
            <div ref={contRef}
            style={{
                display: "grid",
                gridTemplateRows: `1fr ${sliderLength}px 1fr`,
                justifyItems: "center",
                alignItems: "center",
                maxHeight: "100%"
            }}
            className={`h-full`}>
                {/* <div ref={contRef} className={`flex flex-col align-middle items-center p-2 border border-red-500 ${verticalLayout ? "h-1/3" : "h-full"}`}> */}
                <RangeSliderLabel value={startPercent} label={minLabel} extraStyles={"self-end mb-2 text-center"} />
                {/* <RangeInputSlider handler={handleChange} min={-1} max={1} gradientColors={colors} fullHeight={sliderHeight}/> */}
                <RangeInputSlider2 gradientColors={colors} min={-1} max={1} handler={handleChange} vertical/>
                <RangeSliderLabel value={endPercent} label={maxLabel} extraStyles={"self-start mt-2 text-center"} />
            </div> 
        )
    }

    const horizontal = () => {
        return (
            <div className='mb-12'>
                <RangeInputSlider2 gradientColors={colors} min={-1} max={1} handler={handleChange}/>
                <div className='flex justify-between'>
                    <RangeSliderLabel value={startPercent} label={minLabel} extraStyles={"text-start"} />
                    <RangeSliderLabel value={endPercent} label={maxLabel} extraStyles={"text-end"} />
                </div>
            </div>
        )
    }

    
    return (

            <div className='mb-2'>
                <RangeSliderDisplay valueName={name} value={value} minLabel={minLabel} maxLabel={maxLabel} verticallyCompact={verticallyCompact}/>
                <RangeInputSlider2 gradientColors={colors} min={-1} max={1} value={value} handler={handleChange}/>
            </div>
    )
}

export default RangeInput;