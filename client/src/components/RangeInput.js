import React, { useEffect, useMemo, useRef, useState } from 'react';
import RangeInputSlider from './RangeInputSlider';
import { clamp, getMetricColors } from '../utils/utils';
import RangeSliderLabel from './RangeSliderLabel';

import { useWindowSize } from '../utils/hooks';
import RangeInputSlider2 from './RangeInputSlider2';
import RangeSliderDisplay from './RangeSliderDisplay';
import Tooltip from './Tooltip';

function RangeInput({name, value, setValue, minLabel, maxLabel, min=-1, max=1, verticalLayout, verticallyCompact, hasTooltip, showBKPopup}) {

    const [hasInteracted, setHasInteracted] = useState(false);
    const [startPercent, setStartPercent] = useState(0);
    const [endPercent, setEndPercent] = useState(0);

    // For range input with a tooltip, way to hide from externally
    const [showTooltip, setShowTooltip] = useState(true);

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

        if(showTooltip){
            setShowTooltip(false);
        }

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
    
    return (

            <div className='mb-1 relative'>
                { hasTooltip ? <Tooltip parentShow={showTooltip} text={"Adjust these sliders to reflect how you feel about each artwork"} id={"rating-slider-tooltip"} /> : "" }
                <RangeSliderDisplay valueName={name} value={value} minLabel={minLabel} maxLabel={maxLabel} verticallyCompact={verticallyCompact} showBKPopup={showBKPopup}/>
                <RangeInputSlider2 gradientColors={colors} min={-1} max={1} value={value} handler={handleChange}/>
            </div>
    )
}

export default RangeInput;